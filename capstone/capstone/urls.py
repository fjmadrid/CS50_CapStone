"""capstone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


from rest_framework.urlpatterns import format_suffix_patterns
from bpress_backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/authentication/', include('dj_rest_auth.urls')),#Leer https://coffeebytes.dev/login-con-django-rest-framework-drf/
    path('api/patient/', views.PatientProfileDetail.as_view()),
    path('api/patient/measurement/', views.PatientMeasurementList.as_view()),
    path('api/patient/measurement/<int:pk>/', views.PatientMeasurementDetail.as_view()),
    path('api/patient/message/', views.PatientMessageList.as_view()),
    path('api/patient/doctor/', views.PatientDoctorList.as_view()),
    path('api/doctor/', views.DoctorProfileDetail.as_view()),
    path('api/doctor/patient/', views.DoctorPatientList.as_view()),
    path('api/doctor/measurement/<int:patient_id>/', views.DoctorPatientMeasurementList.as_view()),
    path('api/doctor/message/<int:patient_id>/', views.DoctorMessageList.as_view())    
]

urlpatterns = format_suffix_patterns(urlpatterns)