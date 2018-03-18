# SimpleSymptomDiagnosis
The Simple Symptom Diagnosis application provides you with the most frequent diagnosis for your symptom.

## Installation Instructions
1. Download the files to a folder
2. Make sure that your python main or virtual environment have the packages in requirements.txt using pip install -r requirements.txt

## Startup Instructions
### Django Server Setup
1. Activate the virtual environment you set up initially or use the main python environment.
2. Open the command line window in the folder you downloaded the files to.
3. run python manage.py migrate
4. run python manage.py runserver

### React Frontend Setup
1. Open another command line window in the folder you downloaded the files to.
2. Change the directory to the frontend folder
3. run npm i
4. run npm start

## Usage Instructions
### Using React
The React Frontend must be started for this to work
1. Open your web browser to localhost:8000
2. Select the symptom you have from the dropdown
3. Select whether the diagnosis given is correct or not
4. If correct, a report will show a list of all diagnoses for your symptom
5. If not correct, select the correct diagnosis from the dropdown
6. Once selected, the report from step 4 will show.

### Using Django Templates
The React Frontend doesn't need to be started for this to work
1. Open your web browser to localhost:8000/symptom_select
2. The same steps apply here from the react running instructions

## API Documentation
The applications data model is exposed through several urls
1. /api/symptoms/ - gets all the symptoms within the system
2. /api/symptoms/<symptom id> - gets all the diagnoses that are linked to the given symptom
3. /api/symptoms/<symptom id>/retrieve_most_freq - gets the most frequently selected diagnosis that is linked to the given symptom
4. /api/diagnosis/ - gets all the diagnoses within the system
5. /api/diagnosis/<diagnosis id>/ - gets the details for a single diagnosis
6. /api/diagnosis/<diagnosis id>/increment_freq/ - posts a request to increment the frequency of the given diagnosis by one