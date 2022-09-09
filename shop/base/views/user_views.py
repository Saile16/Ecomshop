
from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response




from django.contrib.auth.models import User

from base.serializers import ProductSerializer, UserSerializer,UserSerializerWithToken

# Create your views here.

#TOKENS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

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


@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message ={'detail':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    #gracias a la API de token el request.user devolvera varios valores y no solo el user
    user = request.user    
    #estamos mostrando varios productos por tanto el many va true
    serializer=UserSerializerWithToken(user,many=False)
    data=request.data
    user.first_name=data['name']
    user.username=data['email']
    user.email=data['email']
    #si el usuario escribio algo en el password entonces lo actualizamos
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

#recordar esto al IMPLEMENTAR:
#probamos el usuario desde el rest de django para obtener un token y tener el access:
#con esto ya podemos hacer recien las pruebas y obtener datos de la base de datos
#probamos con postman en este caso revisar collections
#esto lo ve el frontend 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    #gracias a la API de token el request.user devolvera varios valores y no solo el user
    user = request.user    
    #estamos mostrando varios productos por tanto el many va true
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    #estamos mostrando varios productos por tanto el many va true
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    #estamos mostrando varios productos por tanto el many va true
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)    


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
    #gracias a la API de token el request.user devolvera varios valores y no solo el user
    user = User.objects.get(id=pk)
    data=request.data
    user.first_name=data['name']
    user.username=data['email']
    user.email=data['email']
    user.is_staff=data['isAdmin']
    #si el usuario escribio algo en el password entonces lo actualizamos
  
    user.save()    
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    userForDeletion=User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User Deleted')

from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()