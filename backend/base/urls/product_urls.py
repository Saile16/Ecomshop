from django.urls import path
from base.views import product_views as views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,    
# )

urlpatterns = [
   
    # path('products/', views.getProducts, name='get-products'),
    # path('products/<str:pk>/', views.getProduct, name='get-product'),
    #este 2do metodo de paths es despues de refactorizar el codigo
    #creamos carpetas de views y urls, ver en el git
    path('', views.getProducts, name='get-products'),
    path('<str:pk>/', views.getProduct, name='get-product'),
]