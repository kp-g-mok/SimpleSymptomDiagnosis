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
