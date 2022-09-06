
from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response



from base.models import Product
from django.contrib.auth.models import User

# from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from base.serializers import ProductSerializer

# Create your views here.

# #TOKENS
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    #estamos mostrando varios productos por tanto el many va true
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()    
    return Response('Product Deleted')
