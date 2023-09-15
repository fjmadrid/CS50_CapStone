from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics

from bpress_backend.models import *
from bpress_backend.serializers import *

def get_user(user_id):
    """Retrieve an user given its id."""
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise Http404            
        
def is_doctor(user):
    """Is the user a doctor?"""
    if user.groups.filter(name='doctors').count() == 0:
        return False
    else:
        return True

def is_patient(user):
    """Is the user a patient?"""
    if user.groups.filter(name='patients').count() == 0:
        return False
    else:
        return True
    
def get_supervision(patient):
    """Get supervision object given a patient."""
    try:
        return Supervision.objects.get(patient=patient)
    except Measurement.DoesNotExist:
        raise Http404                

class PatientMeasurementList(APIView):
    """
    List all measurements of the current patient, or create a new one.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    
    def get(self, request, format=None):        
        queryset = Measurement.objects.all().filter(user=request.user).order_by('-date')        
        serializer = MeasurementSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):       
        serializer = MeasurementSerializer(data=request.data)        
        if serializer.is_valid():            
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PatientMeasurementDetail(APIView):
    """Retrieve, update or delete a measurement instance of current patient."""
    parser_classes = (JSONParser, )
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, pk):
        try:
            return Measurement.objects.get(pk=pk)
        except Measurement.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        measurement = self.get_object(pk)
        if (request.user != measurement.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = MeasurementSerializer(measurement)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        measurement = self.get_object(pk)
        if (request.user != measurement.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = MeasurementSerializer(measurement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        measurement = self.get_object(pk)
        if (request.user != measurement.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        measurement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PatientMessageList(APIView):
    """
    List all supervision messages of the current patient, or create a new one.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    
    def get(self, request, format=None):
        if not is_patient(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(patient=request.user)
        queryset = Message.objects.all().filter(supervision=supv).order_by('-date')
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        if not is_patient(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = self.get_supervision(request.user)
        serializer = MessageSerializer(data=request.data)     
        if serializer.is_valid():
            serializer.save(supervision=supv, origin=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientDoctorList(APIView):
    """
    List the doctor supervising current patient.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    
    def get(self, request, format=None):
        if not is_patient(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(patient=request.user)
        serializer = UserSerializer(supv.doctor)
        return Response(serializer.data)

class DoctorPatientList(APIView):
    """
    List all patients supervised by the current doctor.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    def get(self, request, format=None):
        if not is_doctor(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = User.objects.filter(supervised_by__doctor=request.user)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class DoctorPatientMeasurementList(APIView):
    """
    List measurements of a patient supervised by the current doctor.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    def get(self, request, patient_id, format=None):
        if not is_doctor(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        patient = get_user(patient_id)
        if not is_patient(patient):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(patient)
        if supv.doctor != request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = Measurement.objects.filter(user=patient)
        serializer = MeasurementSerializer(queryset, many=True)
        return Response(serializer.data)

class DoctorMessageList(APIView):
    """
    List all messages of a patient supervised by the current doctor.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )    
    def get(self, request, patient_id, format=None):
        if not is_doctor(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        patient = get_user(patient_id)
        if not is_patient(patient):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(patient)
        if supv.doctor != request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = Message.objects.filter(supervision=supv)
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request, patient_id, format=None):
        if not is_doctor(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        patient = get_user(patient_id)
        if not is_patient(patient):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(patient)
        if supv.doctor != request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = MessageSerializer(data=request.data)     
        if serializer.is_valid():
            serializer.save(supervision=supv, origin=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailAPI(APIView):
    """Allow login using token authentication.
    From: https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication    
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class RegisterUserAPIView(generics.CreateAPIView):
    """Register a new user
    From: https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication
    """
    permission_classes = (permissions.IsAuthenticated)
    serializer_class = RegisterSerializer