from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import APIView
from Todo.serializers import TaskSerializer, UserSerializer, LoginSerializer,ProductSerializer,OrdersSerializer
from rest_framework import status
from .models import MyUser, task, ProductList,Orders
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
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
        

            



class TaskView(APIView):
    def get(self,request):
        Task = task.objects.all()
        serializer = TaskSerializer(Task,many=True)
        return Response(serializer.data ,status=status.HTTP_302_FOUND)
    
    def post(self,request):
        Task = task.objects.all()
        serializer = TaskSerializer(Task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TaskDetails(APIView):
    def get(self,request,id):
        try:
            Task = task.objects.get(id=id)
        except task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TaskSerializer(Task)
        return Response(serializer.data, status=status.HTTP_302_FOUND)
    
    def put(self,request,id):
        try:
            Task = task.objects.get(id =id)
        except task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TaskSerializer(Task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try: 
            Task = task.objects.get(id=id)
        except task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        Task.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    

class LoginView(APIView):
    def post(self,request,format=None):
        serializer = LoginSerializer(data= request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password= password)
            if user is not None:
                user_data = {
                    'id': user.id,
                    'username': user.firstName,
                    'email': user.email,
                    # Add more fields as needed
                }
                message = "login successful"
                return Response({'message': message, 'user': user_data}, status=status.HTTP_200_OK)
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
    
class OrderListView(APIView):
    def get(self,request):
        order = Orders.objects.all()
        serializer = OrdersSerializer(order, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

    def post(self, request):
        try:
            address = request.data.get('address')
            grand_total = request.data.get('GrandTotal')
            products_data = request.data.get('products')

            order = Orders.objects.create(address=address, GrandTotal=grand_total)

            for product_data in products_data:
                product_id = product_data['id']
                quantity = product_data['quantity']
                product = ProductList.objects.get(pk=product_id)
                order.products.add(product, through_defaults={'quantity': quantity})

            serializer = OrdersSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)