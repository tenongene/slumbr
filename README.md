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
![image](https://github.com/user-attachments/assets/3390aff9-62e4-4ca2-8624-191be38de519) \



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
![image](https://github.com/user-attachments/assets/51266bcd-bccd-4cf2-84a0-c5fa324bb08d)  \

Home Page: \
![image](https://github.com/user-attachments/assets/eb5f1d4e-01eb-4398-8a56-d5dd56e4cf97) \

Questionnaire Page: \
![image](https://github.com/user-attachments/assets/0f3d897a-ae97-4d78-b6d5-ee7cde886ad2) \

Dashboard Page: \
![image](https://github.com/user-attachments/assets/752e3b58-687b-43df-b984-f4ee8d9ac337) \

Education Page: \
![image](https://github.com/user-attachments/assets/564371a9-1270-40e7-aef3-4911904d34da) \

Patient Profile Page: \
![image](https://github.com/user-attachments/assets/1fab5901-2cb1-4060-87ef-711918edbc4f) \
