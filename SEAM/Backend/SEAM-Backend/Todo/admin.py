
from django.contrib import admin
from Todo.models import MyUser,task,ProductList,Orders
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
class UserAdmin(BaseUserAdmin):


    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "firstName","lastName", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["firstName","lastName"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "firstName","lastName", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email","id"]
    ordering = ["email"]
    filter_horizontal = []


# Now register the new UserAdmin...
admin.site.register(MyUser, UserAdmin)


@admin.register(task)

class TaskModelAdmin(admin.ModelAdmin):
    list_display = ["id","user","title","description","due_date","Completed"]


@admin.register(ProductList)
class ProductModelAdmin(admin.ModelAdmin):
    list_display = ["id", "product_title","product_description", "selling_price","discounted_price","category","quantity","product_image"]

@admin.register(Orders)
class OrderModelAdmin(admin.ModelAdmin):
    list_display = ["id", "product_titles", "address", "GrandTotal"]

    def product_titles(self, obj):
        # Concatenate product titles from related ProductList objects
        return ", ".join([product.product_title for product in obj.products.all()])

    product_titles.short_description = "Products" 