from rest_framework import serializers
from django.conf import settings

from core.abstract.serializers import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if not rep['avatar']:
            rep['avatar'] = settings.DEFAULT_AVATAR_URL
            return rep

        if settings.DEBUG:  # debug enabled for dev
            request = self.context.get('request')
            rep['avatar'] = request.build_absolute_uri(rep['avatar'])
        return rep

    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'username', "name", 'first_name', 'last_name', 'bio', 'avatar',
                  'email', 'password', 'is_active', 'created', 'updated', 'posts_count']
        # List of all the fields that can only be read by the user
        read_only_fields = ['is_active']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        instance.is_active = True
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
