from rest_framework import serializers

from Todo.models import MyUser, ProductList,OrderList
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer




#Custom Serializer

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    profile_pic = serializers.ImageField(
        required = False,
        error_messages={
            'invalid_image': 'The uploaded file is not a valid image.',
        }
    ) 
    password1 = serializers.CharField(style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = MyUser
        fields = ['id','first_name', 'last_name', 'email', 'phone_number','password1','password2','profile_pic']
        extra_kwargs = {
            'password':{'write_only':True}
        }


    def validate(self,attrs):
        password1 = attrs.get('password1')
        password2 = attrs.get('password2')

        if password1 != password2:
            raise serializers.ValidationError("Password doesn't match ")
        
        return attrs

    def create(self,validated_attrs):
        password = validated_attrs.pop('password1')
        validated_attrs.pop('password2')
        user = MyUser.objects.create_user(password=password, **validated_attrs)
        return user
    


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.first_name +' '+ user.last_name
        token['Phone Number'] = user.phone_number

        return token


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductList
        fields = ["id", "product_title","product_description","selling_price","discounted_price","category","product_image"]



class OrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderList
        fields = ["id", "order_id","ordered_at", "Delivery_destination","product_details", "GrandTotal","user"]

