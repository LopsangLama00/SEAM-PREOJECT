
from django.contrib import admin
from Todo.models import MyUser, ProductList,OrderList
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
class UserAdmin(BaseUserAdmin):


    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "first_name","last_name","phone_number","profile_pic" ,"is_superuser"]
    list_filter = ["is_superuser"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["first_name","last_name","phone_number"]}),
        ("Permissions", {"fields": ["is_superuser" ,"is_staff", "is_active", "groups", "user_permissions"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "first_name","last_name","phone_number", "password1","password2","is_superuser", "is_staff", "is_active"],
            },
        ),
    ]
    search_fields = ["email","id","phone_number"]
    ordering = ["email"]
    filter_horizontal = ["groups","user_permissions"]


# Now register the new UserAdmin...
admin.site.register(MyUser, UserAdmin)




@admin.register(ProductList)
class ProductModelAdmin(admin.ModelAdmin):
    list_display = ["id", "product_title","product_description", "selling_price","discounted_price","category","product_image"]

@admin.register(OrderList)
class OrderModelAdmin(admin.ModelAdmin):
    list_display = ["id", "order_id", "Delivery_destination","user_id","user_first_name","user_phone_number", "GrandTotal","ordered_at","product_details"]
    list_filter = ["ordered_at","user_id"]
    search_fields = ["order_id","ordered_at","Delivery_destination","user_id"]


    def user_first_name(self, obj):
        return obj.get_user_first_name()
    user_first_name.short_description = 'User Name'

    def user_phone_number(self, obj):
        return obj.get_user_phone_number()
    user_phone_number.short_description = 'User Phone Number'

    def user_id(self, obj):
        return obj.get_user_id()
    user_id.short_description = 'User ID'

