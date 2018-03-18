from django.db import models


# Create your models here.
class Symptom(models.Model):
    name = models.CharField(max_length=100, default='Default Symptom Name')
    

class Diagnosis(models.Model):
    name = models.CharField(max_length=100, default='Default Diagnosis Name')
    frequency = models.IntegerField(default=1)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)

    class Meta:
        get_latest_by = 'frequency'
        
    def increment_frequency(self):
        self.frequency += 1
        self.save()
