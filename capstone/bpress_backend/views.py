from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination

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

class PatientProfileDetail(APIView):
    """Retrieve current patient profile."""
    parser_classes = (JSONParser, )
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, user):
        try:
            return UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        profile = self.get_object(request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
class PatientMeasurementList(APIView, PageNumberPagination):
    """
    List all measurements of the current patient, or create a new one.
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (JSONParser, )
    
    def get(self, request, format=None):        
        queryset = Measurement.objects.all().filter(user=request.user).order_by('-date')
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = MeasurementSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
    
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
    
class PatientMessageList(APIView, PageNumberPagination):
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
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = MessageSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
    def post(self, request, format=None):
        if not is_patient(request.user):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        supv = get_supervision(request.user)
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

class DoctorProfileDetail(APIView):
    """Retrieve current doctor profile."""
    parser_classes = (JSONParser, )
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, user):
        try:
            return DoctorProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        profile = self.get_object(request.user)
        serializer = DoctorProfileSerializer(profile)
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

class DoctorPatientMeasurementList(APIView, PageNumberPagination):
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
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = MeasurementSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

class DoctorMessageList(APIView,  PageNumberPagination):
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
        queryset = Message.objects.filter(supervision=supv).order_by('-date')
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = MessageSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
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

