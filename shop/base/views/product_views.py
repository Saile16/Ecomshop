


from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response


from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

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
    #de esta manera paginamos los productos
    page=request.query_params.get('page')
    paginator=Paginator(products,4)
    try:
        products=paginator.page(page)
    #cuando inicamos la pagina no hay ningun parametro
    except PageNotAnInteger:
        products=paginator.page(1)

    #cuando llegamos al final de la pagina y asi no permitimos al user a ir mas
    #lejos de las paginas que ya tenemos
    except EmptyPage:
        products=paginator.page(paginator.num_pages)

    if page == None:
        page=1

    page=int(page)
    #estamos mostrando varios productos por tanto el many va true
    serializer=ProductSerializer(products,many=True)
    return Response({"products":serializer.data,"page":page,"pages":paginator.num_pages})


@api_view(['GET']) 
def getTopProducts(request):
    #obtenemos los productos que tengan un rating que sean igual o mayores de 4
    #y los ordenamos de mayor a menor y solo los primeros [0:5]
    products=Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
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