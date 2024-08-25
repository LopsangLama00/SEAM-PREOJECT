from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import APIView
from Todo.serializers import  UserSerializer, LoginSerializer,ProductSerializer,OrdersSerializer
from rest_framework import status
from .models import MyUser, ProductList,OrderList
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .utils import decode_jwt_token



# Create your views here.


class UserProfileView(APIView):
    def get(self,request):
        
        
        details = MyUser.objects.all()
        serializer = UserSerializer(details, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = UserSerializer(data= request.data)
        if serializer.is_valid():
            user = serializer.save()
            message = "Registration Successful"
            context = {
                "message":message,
                "data" : serializer.data
            }
            
            return Response(context,status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserProfileEditView(APIView):
    def get(self, request, id):
        try:
            detail = MyUser.objects.get(id =id)
        except MyUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
        serializer = UserSerializer(detail)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def put(self,request,id):
        try:
            detail = MyUser.objects.get(id =id)
        except MyUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(detail,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        try:
            detail = MyUser.objects.get(id =id)
        except MyUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # serializer = UserSerializer(detail)
        detail.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
        

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
            


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email= email, password=password)
            if user is not None:
                message = "login successful"
                token_serializer = CustomTokenObtainPairSerializer(data=request.data)
                if token_serializer.is_valid():
                    token = token_serializer.validated_data
                    response = {
                        'message': message,
                        'token': token
                    }
                    return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_erros':['Email or password is not valid']}},status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ProductListView(APIView):
    def get(self,request):
        products = ProductList.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

    def post(self,request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


#PRODUCT LIST EDIT VIEW
class ProductListEditView(APIView):
    def get(self,request,id):
        try:
            product = ProductList.objects.get(id=id)
        except ProductList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_302_FOUND)

    def put(self,request,id):
        try:
            product = ProductList.objects.get(id=id)
        except ProductList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        

    # def patch(self,request,id):
    #     try:
    #         product = ProductList.objects.get(id=id)
    #     except ProductList.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
        

    #     serializer = ProductSerializer(product, data = request.data)


    def delete(self,request,id):
        try:
            product = ProductList.objects.get(id=id)
        except ProductList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)


#Order View(GET, POST)
class OrderListView(APIView):
    # permission_classes = [IsAuthenticated]
    # # authentication_classes = [JWTAuthentication]

    def get(self, request):
        order = OrderList.objects.all()
        serializer = OrdersSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = auth_header.split(' ')[1]
            user_id = decode_jwt_token(token)
            Delivery_destination = request.data.get('Delivery_destination')
            product_details = request.data.get('product_details')
            GrandTotal = request.data.get('GrandTotal')

            order = OrderList.objects.create(
                Delivery_destination=Delivery_destination,
                product_details=product_details,
                GrandTotal=GrandTotal,
                user_id=user_id  # Assuming you have a user_id field in OrderList
            )

            serializer = OrdersSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

#SEARCH FUNCTION FOR PRODUCT LIST
class  SearchFunctionView(APIView):

    def post(self,request):
        print("Requested Data:" ,request.data)
        query = request.data.get('search')


        if query:
            search_query = ProductList.objects.filter(product_title__icontains=query)
            serializer = ProductSerializer(search_query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "No query parameter provided"}, status=status.HTTP_400_BAD_REQUEST)

    # def post(self,request):

        
    #     serializer = ProductSerializer(searchQuery)
    #     return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

