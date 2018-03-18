from django.test import TestCase
from rest_framework.test import APIClient

from api.views import SymptomViewSet, DiagnosisViewSet
from api.models import Symptom, Diagnosis

# Create your tests here.
class SymptomViewSetTest(TestCase):
    """
        Test that the intial data is loaded and displayed correctly
        Also tests that the specific functionality needed to get the most frequent diagnosis and diagnosis report is available
    """
    def setUp(self):
        self.client = APIClient()

    def test_displays_symptoms(self):
        response = self.client.get('/api/symptoms/', format='json')
        self.assertEquals(response.data[0]['name'], "sore throat")
        self.assertEquals(response.data[1]['name'], "itchy rash")
        self.assertEquals(response.data[2]['name'], "runny nose")
        
    def test_displays_symptom_diagnosis(self):
        response = self.client.get('/api/symptoms/1/', format='json')
        self.assertEquals(response.data[0]['symptom']['name'], 'sore throat')
        self.assertEquals(response.data[0]['name'], 'common cold')
        self.assertEquals(response.data[1]['name'], 'viral throat infection')        
        
    def test_displays_symptom_most_frequent_diagnosis(self):
        response = self.client.post('/api/diagnosis/1/increment_freq/')
        response = self.client.get('/api/symptoms/1/retrieve_most_freq/', format='json')
        self.assertEquals(response.data['name'], 'common cold')
        self.assertEquals(response.data['frequency'], 2)
        
class DiagnosisViewSetTest(TestCase):
    """
       Test that the intial data is loaded and displayed correctly
       Also tests that a diagnosis can be incremented in frequency through the api path
    """
    def setUp(self):
        self.client = APIClient()

    def test_displays_diagnosis(self):
        response = self.client.get('/api/diagnosis/', format='json')
        self.assertEquals(response.data[0]['name'], 'common cold')
        self.assertEquals(response.data[1]['name'], 'viral throat infection')
        self.assertEquals(response.data[28]['name'], 'bronchiectasis')
        
    def test_can_increment_diagnosis_freq(self):
        response = self.client.post('/api/diagnosis/1/increment_freq/', format='json')
        self.assertEquals(response.data['name'], 'common cold')
        self.assertEquals(response.data['frequency'], 2)


class ViewFunctionsTest(TestCase):
    """
        Tests that the right templates are used by the views
        Test that the views retrieve the correct values
        Test that the diagnosis_report view increments the frequency for the given diagnosis
    """
    def test_templates_used(self):
        url_template_list = [
            { 'path': 'symptom_select/', 'template': 'symptom_select.html'},
            { 'path': 'diagnosis_confirm/1', 'template': 'diagnosis_confirm.html'},
            { 'path': 'diagnosis_select/1', 'template': 'diagnosis_select.html'},
        ]
        
        for url_template in url_template_list:
            response = self.client.get(url_template['path'])
            self.assertTemplateUsed(response, url_template['template'])
            
        response = self.client.post('diagnosis_select/1/1')
        self.assertTemplateUsed(response, 'diagnosis_report.html')
            
    def test_values_retrieved_from_url(self):
        url_value_list = [
            { 'path': 'diagnosis_confirm/1', 'variable': 'diagnosis', 'value': Diagnosis.objects.filter(symptom=Symptom.objects.get(id=1)).latest()},
            { 'path': 'diagnosis_select/1', 'variable': 'symptom', 'value': Symptom.objects.get(id=1)},
            { 'path': 'diagnosis_select/1', 'variable': 'diagnosis', 'value': list(Diagnosis.objects.filter(symptom=Symptom.objects.get(id=1)).values())},
        ]

        for url_value in url_value_list:
            response = self.client.get(url_value['path'])
            self.assertEqual(response.context['diagnosis'], url_value['value'])
		
        { 'path': 'diagnosis_select/1/1', 'value': Diagnosis.objects.filter(symptom=Symptom.objects.get(id=1))},
        response = self.client.post('diagnosis_report/1/1')
        self.assertEqual(response.context['symptom'], Symptom.bojects.get(id=1))
        self.assertEqual(response.context['symptom'], list(Diagnosis.objects.filter(symptom=Symptom.objects.get(id=1)).values()))

    def test_increment_diagnosis_frequency(self):
        response = self.client.post('diagnosis_report/1/1')
        diagnosis_ = Diagnosis.objects.get(id=1, symptom=Symptom.objects.get(id=1))
        self.assertEqual(diagnosis_.frequency, 2)
