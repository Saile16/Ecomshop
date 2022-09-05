
from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response
from backend.base import serializers



from base.models import Product,Order,OrderItem,ShippingAddress
from django.contrib.auth.models import User

# from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from base.serializers import ProductSerializer,OrderSerializer

from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    #pedimos el user y los datos que nos enviaran del front
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    #si no hay items en el carrito
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # (2) Create shiping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],             
        )

        # (3) Create order items and set order to orderItem relationship
        for i in orderItems:
            product=Product.objects.get(_id=i['_id'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock
            product.countInStock -= item.qty
            product.save()
    serializer=OrderSerializer(order,many=False)    
    return Response(serializer.data)