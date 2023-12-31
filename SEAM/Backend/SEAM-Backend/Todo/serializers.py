from rest_framework import serializers

from Todo.models import MyUser, task, ProductList,Orders,OrderProduct



#Custom Serializer

class UserSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = MyUser 
        fields = ["id","email","firstName","lastName","password","password2"]
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Password doesn't match ")
        
        return attrs
    
    def create(self, validate_data):
        return MyUser.objects.create_user(**validate_data)
    

#Task Serializer

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = task
        fields = ["id","user","title","description","due_date","Completed"]
        

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    class Meta:
        model = MyUser
        fields = ["email","password"]



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductList
        fields = ["id", "product_title","product_description","selling_price","discounted_price","category","quantity","product_image"]

class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ['product', 'quantity']

class OrdersSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True, read_only=True)

    class Meta:
        model = Orders
        fields = ["id", "order_products", "address", "GrandTotal"]


    