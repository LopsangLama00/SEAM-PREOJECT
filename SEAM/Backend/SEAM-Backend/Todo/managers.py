from django.contrib.auth.base_user import BaseUserManager


class CustomManager(BaseUserManager):
    def create_user(self, email, phone_number, password = None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        if email:
            email= self.normalize_email(email)

        if not phone_number:
            raise ValueError("Phone Number is required")
        
        first_name  = extra_fields.pop('first_name','')
        last_name = extra_fields.pop('last_name','')
        user = self.model(email=email, phone_number = phone_number, password = password,first_name= first_name, last_name= last_name,**extra_fields)
        user.set_password(password)
        user.save(using = self.db)

        return user

    def create_superuser(self,email,phone_number, password=None, **extra_fields ):
        extra_fields.setdefault('is_staff' , True)
        extra_fields.setdefault('is_superuser' , True)
        extra_fields.setdefault('is_active' , True)
        first_name = extra_fields.pop('first_name', '')
        last_name = extra_fields.pop('last_name', '')

        return self.create_user(email=email, phone_number= phone_number, password= password,first_name= first_name, last_name = last_name,  **extra_fields)