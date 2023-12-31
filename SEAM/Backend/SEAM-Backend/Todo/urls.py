from django.urls import path
from Todo import views

urlpatterns = [
    path('UserData',views.UserProfileView.as_view(),name='registration'),
    path('UserData/<int:id>', views.UserProfileEditView.as_view(),name='edit'),
    path('',views.TaskView.as_view(), name='taskview'),
    path('task/<int:id>',views.TaskDetails.as_view(), name='taskDetails'),
    path('login',views.LoginView.as_view(), name = 'login'),
    path('productlist', views.ProductListView.as_view() , name='products'),
    path('order',views.OrderListView.as_view(),name="order"),
]
