from rest_framework import serializers
from bpress_backend.models import User, UserProfile, Measurement, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'username' ]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [ 'id', 'user', 'birthdate', 'weight', 'height', ]

class MeasurementSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Measurement
        fields = [ 'id', 'user', 'systolic', 'diastolic', 'ppm', 'date',
                  'observation', ]
        read_only_fields = [ 'user' ]
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [ 'id', 'supervision', 'origin', 'date', 'text' ]
        read_only_fields = [ 'supervision', 'origin', 'date' ]
        
class SupervisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [ 'id', 'doctor', 'patient' ]