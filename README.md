**CS 6440 Final Practicum Project for Team #44**  \
**Spring 2025** \
**Georgia Institute of Technology**


Access deployed application at:   **https://slumbr-app.dlel4n1x0xq0x.amplifyapp.com/**   \
Sample patient Login credentials for existing user data provided to Teaching Assistant:\
{ See **users.js** file in repository, and section III in paper deliverable - ***For Demonstation, Grading and Evaluation only*** } 
(Not best practice - Smart FHIR is best practice in real-world production settings)
\
\
\
\
\
\
![image](https://github.gatech.edu/tenongene3/slumbr/assets/88850/8efcdd9e-36da-4dff-8738-1d0aaca62c53)

**TECHNICAL SPECIFICATIONS:**  \
\
Application Frontend:  React JS - Hosted in AWS Amplify \
Application Backend: NodeJS - Hosted as Google Cloud Run Function \
FHIR Server - Google Healthcare API \
AI Recommendation - Google Gemini API \
Datastore For Charts Array - Google Cloud Firestore 

\
\
Fhir Synthea Sample Dataset of 119 patients (Fhir Store) in Google Cloud Storage Bucket (Part of the Synthea_Sample_patient-data.zip file in this repository): \
**https://console.cloud.google.com/storage/browser/fhirstore_bucket/synthea-data?project=slumbr-453203&pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))**

\
\
Google Cloud Function - Backend Code that interacts with FHIR Server (Also as backend/index.js in this repository):
**https://console.cloud.google.com/run/detail/us-central1/slumbr-lambda/source?project=slumbr-453203**

\
Datastore For Charts Array - Google Cloud Firestore:
**https://console.cloud.google.com/firestore/databases/-default-/data/panel/slumbr_data/carrol.tomoko@gmail.com?cloudshell=true&project=slumbr-453203**

\
\
\
\

**SCREENSHOTS**

Login Page: \
![Login](https://github.gatech.edu/tenongene3/slumbr/assets/88850/3af96c9b-4626-47b9-97f3-d53b1e6f4361) \

Home Page: \
![HomePage](https://github.gatech.edu/tenongene3/slumbr/assets/88850/92afc264-fb6d-47ea-9d9e-52f7dd63e204) \

Questionnaire Page: \
![QuestionnairePage](https://github.gatech.edu/tenongene3/slumbr/assets/88850/6f5cc6a4-64d4-4520-a43c-0573ff054e65) \

Dashboard Page: \
![Dashboard](https://github.gatech.edu/tenongene3/slumbr/assets/88850/8021247c-a34d-4cb2-af07-4fe3c9f6ec72) \

Education Page: \
![PatientEducation](https://github.gatech.edu/tenongene3/slumbr/assets/88850/777f26e4-807b-430c-94d2-d2b24e9cfd9e) \

Patient Profile Page: \
![ProfilePage](https://github.gatech.edu/tenongene3/slumbr/assets/88850/b399b72b-463f-4c6e-a8d9-af3d9b942d96) \
