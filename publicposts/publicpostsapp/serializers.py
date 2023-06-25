from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id','text', 'likesCount', 'date')

# dhas not been used in the App
class PostSerializer_(serializers.ModelSerializer):
# class PostSerializer_(serializers.HyperlinkedModelSerializer):
   class Meta:
       model = Post
       fields = ['id','text', 'likesCount', 'date',]
#===============================