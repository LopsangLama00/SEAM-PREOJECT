from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from Todo.managers import CustomManager
from .utils import generate_random_string


class MyUser(AbstractUser):

    username = None
    email = models.EmailField(unique = True, max_length=254,  blank=False)
    phone_number = models.CharField(max_length =  100, unique = True, blank=False)
    profile_pic = models.ImageField(upload_to='profile')


    objects = CustomManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS= ["phone_number"]


    

CATEGORY_CHOICES = (

    ('LP', 'Laptop'),
    ('SM', 'Smartphone'),
    ('BK', 'Bike'),
    ('WH', 'Watch'),
    ('TM', 'Trimmer'),
    ('CH', 'Charger'),

)



class ProductList(models.Model):
    product_title = models.CharField(max_length=150)
    product_description = models.TextField(max_length=255)
    selling_price = models.DecimalField(max_digits=8, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    product_image = models.ImageField(upload_to='product')

    def __str__ (self):
        return self.product_title
    

class OrderList(models.Model):
    order_id = models.CharField(max_length=15,default=generate_random_string, unique=True, blank=False)
    ordered_at = models.DateTimeField(auto_now_add=True)
    GrandTotal = models.DecimalField(max_digits=15, decimal_places=2)
    Delivery_destination = models.CharField(max_length= 255)
    product_details = models.JSONField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)


    def __str__ (self):
        return self.order_id
    
    def get_user_id(self):
        return self.user.pk
    
    def get_user_first_name(self):
        return self.user.first_name
    
    def get_user_phone_number(self):
        return self.user.phone_number
    
 




