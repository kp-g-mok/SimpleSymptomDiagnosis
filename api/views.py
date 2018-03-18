from django.shortcuts import redirect, render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from .models import Symptom, Diagnosis
from .serializers import SymptomSerializer, DiagnosisSerializer


# Create your views here.
class SymptomViewSet(viewsets.ModelViewSet):
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer

    def retrieve(self, request, pk=None):
        symptom = get_object_or_404(self.queryset, pk=pk)
        data = Diagnosis.objects.filter(symptom=symptom)
        serialized_data = DiagnosisSerializer(data, many=True)
        return Response(serialized_data.data)

    @detail_route()
    def retrieve_most_freq(self, request, pk=None):
        symptom = get_object_or_404(self.queryset, pk=pk)
        data = Diagnosis.objects.filter(symptom=symptom).latest()
        serialized_data = DiagnosisSerializer(data)
        return Response(serialized_data.data)


class DiagnosisViewSet(viewsets.ModelViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer

    @detail_route(methods=['post'])
    def increment_freq(self, request, pk=None):
        diagnosis = get_object_or_404(self.queryset, pk=pk)
        diagnosis.increment_frequency()
        serialized_data = DiagnosisSerializer(diagnosis)
        return Response(serialized_data.data)

def symptom_select(request):
    symptom_ = list(Symptom.objects.all().values())
    return render(request, 'symptom_select.html', {'symptoms': symptom_})
	
def diagnosis_confirm(request, symptom_id):
    symptom_ = Symptom.objects.get(id = symptom_id)
    diagnosis_ = Diagnosis.objects.filter(symptom=symptom_).latest()
    return render(request, 'diagnosis_confirm.html', {'diagnosis': diagnosis_})
	
def diagnosis_select(request, symptom_id):
    symptom_ = Symptom.objects.get(id = symptom_id)
    diagnosis_ = list(Diagnosis.objects.filter(symptom=symptom_).values())
    return render(request, 'diagnosis_select.html', {'symptom': symptom_, 'diagnosis': diagnosis_})
    
def diagnosis_report(request, symptom_id, diagnosis_id):
    update_diagnosis = Diagnosis.objects.get(id=diagnosis_id)
    update_diagnosis.increment_frequency()
    
    symptom_ = Symptom.objects.get(id = symptom_id)
    diagnosis_ = list(Diagnosis.objects.filter(symptom=symptom_).values())
    return render(request, 'diagnosis_report.html', {'symptom': symptom_, 'diagnosis': diagnosis_})
