from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass

class Supervision(models.Model):
    """Models the relation between a doctor and his supervised patients."""
    doctor = models.ForeignKey(User, on_delete=models.CASCADE,
                                    related_name='supervising')
    patient = models.ForeignKey(User, on_delete=models.CASCADE,
                                    related_name='supervised_by')
    def __str__(self):
        return f'{self.doctor.username} supervising {self.patient.username}'
class UserProfile (models.Model):
    """Profile class to extend User model.    
        Then  if u is an instance of User model, we can get profile data with
        u.profile.xxx
    Args:
        models (_type_): _description_
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                related_name='profile')
    birthdate = models.DateField('Birthdate')
    weight = models.FloatField('Weight')
    height = models.FloatField('Height')            

class Measurement(models.Model):
    """Models a measurement of the blood pressure taken by a patient."""
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='measurements')
    systolic = models.IntegerField()
    diastolic = models.IntegerField()
    ppm = models.IntegerField()
    date = models.DateTimeField()
    observation = models.CharField(max_length=256, null=True, blank=True)
    def __str__(self):
        return f'{self.user.username}: {self.systolic:3},{self.diastolic:3},{self.ppm:3}'
class Message(models.Model):
    """Models a message which belongs to doctor/patient supervision."""
    supervision = models.ForeignKey(Supervision, related_name='messages', on_delete=models.CASCADE)
    origin = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=1048)
    def __str__(self):
        return '{}:{} {}'.format(self.origin.username, self.date,
                                 self.text if len(self.text)<=10 else 
                                 self.text[:10]+' ...')
    