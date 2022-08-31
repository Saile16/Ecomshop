from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,    
# )

urlpatterns = [
    #autentication
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('', views.getRoutes, name='get-routes'),

    path('users/profile/',views.getUserProfile,name='user-profile'),

    path('products/', views.getProducts, name='get-products'),
    path('products/<str:pk>/', views.getProduct, name='get-product'),
]