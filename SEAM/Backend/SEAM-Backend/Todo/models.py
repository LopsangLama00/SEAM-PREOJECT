from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, firstName,lastName, password=None,password2=None):
        """
        Creates and saves a User with the given email,name and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            firstName = firstName,
            lastName = lastName
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstName,lastName, password=None,password2=None):
        """
        Creates and saves a User with the given email,name and password.

        """
        user = self.create_user(
            email,
            password=password,
            firstName=firstName,
            lastName=lastName
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    firstName = models.CharField(max_length=150)
    lastName = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstName","lastName"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    


class task(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    due_date = models.DateTimeField()
    Completed = models.BooleanField(default=False)

    def __str__ (self):
        return self.title
    


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
    quantity = models.IntegerField(default= 1)
    product_image = models.ImageField(upload_to='product')

    def __str__ (self):
        return self.product_title
    

class OrderProduct(models.Model):
    order = models.ForeignKey('Orders', on_delete=models.CASCADE)
    product = models.ForeignKey('ProductList', on_delete=models.CASCADE)
    quantity = models.IntegerField()


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    products = models.ManyToManyField(ProductList,through=OrderProduct, related_name='orders')
    address = models.CharField(max_length=255)
    GrandTotal = models.DecimalField(max_digits=9,decimal_places=2)

    
 




