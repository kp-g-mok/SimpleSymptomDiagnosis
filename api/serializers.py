from rest_framework import serializers

from .models import Symptom, Diagnosis


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom 
        fields = ['id', 'name',]


class DiagnosisSerializer(serializers.ModelSerializer):
    symptom = SymptomSerializer()
    class Meta:
        model = Diagnosis
        fields = ['name', 'frequency', 'symptom']
