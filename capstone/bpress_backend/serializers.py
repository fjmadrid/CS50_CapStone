from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from bpress_backend.models import User, UserProfile, Measurement, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True);
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'birthdate', 'weight', 'height', ]


class RegisterSerializer(serializers.ModelSerializer):
    """ Serialize Registration data.
    From: https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ['id', 'user', 'systolic', 'diastolic', 'ppm', 'date',
                  'observation', ]
        read_only_fields = ['user']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'supervision', 'origin', 'date', 'text']
        read_only_fields = ['supervision', 'origin', 'date']


class SupervisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'doctor', 'patient']
