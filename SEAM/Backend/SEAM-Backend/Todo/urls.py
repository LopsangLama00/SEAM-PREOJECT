from django.urls import path
from Todo import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('UserData',views.UserProfileView.as_view(),name='registration'),
    path('UserData/<int:id>', views.UserProfileEditView.as_view(),name='edit'),
    path('login/',views.LoginView.as_view(), name = 'login'),
    path('productlist', views.ProductListView.as_view() , name='products'),
    path('productlist/<int:id>', views.ProductListEditView.as_view(), name='product_edit'),
    path('order',views.OrderListView.as_view(),name="order"),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('search/', views.SearchFunctionView.as_view(), name='search_product')
]
