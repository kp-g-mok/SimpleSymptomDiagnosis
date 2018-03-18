from django.test import TestCase
from api.models import Symptom, Diagnosis

# Create your tests here.
class SymptomModelTest(TestCase):
    """
        Only a simple default text test since there isn't a real need for the models to be able to add new symptoms. But would be nice to know that the model setup works as intended.
    """
    def test_default_text(self):
        symptom_ = Symptom()
        self.assertEqual(symptom_.name, 'Default Symptom Name')
		
class DiagnosisModelTest(TestCase):
    """
        Default test included for same reason as above.
        Increment frequency test to make sure that the diagnosis model updates appropriately.
    """
    def test_default_values(self):
        diagnosis_ = Diagnosis()
        self.assertEqual(diagnosis_.name, 'Default Diagnosis Name')
        self.assertEqual(diagnosis_.frequency, 1)

    def test_increment_frequency(self):
        diagnosis_ = Diagnosis.objects.first()
        diagnosis_.increment_frequency()
        diagnosis_ = Diagnosis.objects.first()
        self.assertEqual(diagnosis_.frequency, 2)
