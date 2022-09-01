from rest_framework import serializers
from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product

class UserSerializer(serializers.ModelSerializer):
    #agregamos un "campo" de esta manera creamos el name y creamos el def get_name
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']
    #de esta manera llamamos y guardamos los datos desde la db a las variables creadas
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self,obj):
        name=obj.first_name
        if (name==''):
            name=obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    #esta obtencion de campos es para poder mostar el token en el rest u otros campos que queramos
    #en esta caso todos esos campos fields
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields=['id','_id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        #estamos obteniendo el token y lo guardamos
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'
