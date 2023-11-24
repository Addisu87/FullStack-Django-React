from core.abstract.serializers import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["name"] = instance.name
        return rep

    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'username', "name", 'first_name', 'last_name', 'bio', 'avatar',
                  'email', 'password', 'is_active', 'created', 'updated']
        # List of all the fields that can only be read by the user
        read_only_field = ['is_active']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        instance.is_active = True
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
