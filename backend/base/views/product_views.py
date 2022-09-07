
from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response



from base.models import Product,Review
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
    #asi obtenemos el query string del front
    query=request.query_params.get('keyword')
    if query == None:
        query = ''
    # products=Product.objects.all()
    #de esta manera filtramos los productos que contengan ese query
    products=Product.objects.filter(name__icontains=query)
    #estamos mostrando varios productos por tanto el many va true
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET']) 
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user=request.user
    product=Product.objects.create(
        user=user,
        name='Sample name',
        price=0,
        brand='Sample brand',
        countInStock=0,
        category='Sample category',
        description=''

    )
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['PUT']) 
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    product = Product.objects.get(_id=pk)
    data=request.data
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.countInStock=data['countInStock']
    product.category=data['category']
    product.description=data['description']
    
    product.save()
    
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()    
    return Response('Product Deleted')




@api_view(['POST'])
def uploadImage(request):
    data=request.data
    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)
    product.image=request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user=request.user
    product=Product.objects.get(_id=pk)
    data=request.data

    #1- Review already exists
    alreadyExists=product.review_set.filter(user=user).exists()
    if alreadyExists:
        content={'detail':'Product already reviewed'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)        
    #2- No Rating or 0
    elif data['rating']==0:
        content={'detail':'Please select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    #3- Create review
    else:
        review=Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],            
        )
        reviews=product.review_set.all()
        product.numReviews=len(reviews)

        total=0
        for i in reviews:
            total += i.rating

        product.rating=total/len(reviews)            
        product.save()
        return Response('Review Added')



