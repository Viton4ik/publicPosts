from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


# from rest_framework import permissions
# from rest_framework import viewsets
# import django_filters.rest_framework
# from publicpostsapp.serializers import PostSerializer_


from .models import Post
from .serializers import *

# получениe списка всех постов
@api_view(['GET', 'POST'])
def posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many = True)  # many = True, необходимо для списка объектов.
        return(Response({'data': serializer.data}))
    elif request.method == 'POST':
        post = Post()
        post.text = request.data['text']
        post.save()
        return Response(status=status.HTTP_200_OK)

# метод для того, чтобы ставить лайки
@api_view(['GET'])
def like_post(request, post_id):
    if request.method == 'GET':
        try:
            post = Post.objects.get(id = post_id)
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        setattr(post, 'likesCount', post.likesCount + 1)
        post.save()
        return Response(post.likesCount, status.HTTP_200_OK)


# # create a ReadOnly
# class ReadOnly(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.method in permissions.SAFE_METHODS
    
# class PostViewset(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer_

#     filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
#     filterset_fields = ['id','text', 'likesCount', 'date', ]

#     # deny all by default using rest_framework
#     permission_classes = [permissions.IsAuthenticated|ReadOnly]