
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken

# Create your views here.

#TOKENS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


#ESTO LO VE EL BACKEND en el rest
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer= UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k]=v

        # data['username'] = self.user.username
        # data['email'] = self.user.email

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes,)


#recordar esto al IMPLEMENTAR:
#probamos el usuario desde el rest de django para obtener un token y tener el access:
#con esto ya podemos hacer recien las pruebas y obtener datos de la base de datos
#probamos con postman en este caso revisar collections
#esto lo ve el frontend 
@api_view(['GET'])
def getUserProfile(request):
    #gracias a la API de token el request.user devolvera varios valores y no solo el user
    user = request.user
    
    #estamos mostrando varios productos por tanto el many va true
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

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