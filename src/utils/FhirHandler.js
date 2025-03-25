//convert surverys to fhir format

export function convertSurveyJsonToFhir(surveyJson, patientId, surveyDate) {
  const fhirQuestionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    status: "completed",
    subject: {
      reference: `Patient/${patientId}`,
    },
    authored: `${surveyDate}T00:00:00Z`,
    item: [],
  };

  surveyJson.pages.forEach((page) => {
    page.elements.forEach((element) => {
      const item = {
        linkId: element.name,
        text: element.title,
        answer: [],
      };

      if (element.type === "text") {
        if (element.inputType === "time") {
          item.answer.push({
            valueTime: null, // Placeholder
            valueString: null, // Placeholder
          });
        } else if (element.inputType === "number") {
          item.answer.push({
            valueInteger: null, // Placeholder
            valueString: null, // Placeholder
          });
        }
      } else if (element.type === "rating") {
        item.answer.push({
          valueInteger: null, // Placeholder
          valueString: null, // Placeholder
        });
      } else if (element.type === "boolean") {
        item.answer.push({
          valueBoolean: null, // Placeholder
          valueString: null, // Placeholder
        });
      } else if (element.type === "comment") {
        item.answer.push({
            valueString: null, //placeholder
        });
      }

      fhirQuestionnaireResponse.item.push(item);
    });
  });

  return fhirQuestionnaireResponse;
}
/* To add it to a FHIR server:

Ensure the server is configured to accept QuestionnaireResponse resources.
Send an HTTP POST request to the server's QuestionnaireResponse endpoint.
Include the JSON object in the request body, with the correct Content-Type header (e.g., application/fhir+json).

*/

export async function sendToFhirServer(fhirResource, serverUrl) {
    try {
        const response = await fetch(`${serverUrl}/QuestionnaireResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/fhir+json'
            },
            body: JSON.stringify(fhirResource)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('FHIR server response:', result);
        return result;

    } catch (error) {
        console.error('Error sending to FHIR server:', error);
        return null;
    }
}

//Use example:
const serverUrl = 'YOUR_FHIR_SERVER_URL'; // Replace with your server URL
sendToFhirServer(fhirResource, serverUrl);



/*
Constructs a GET request to the FHIR server's QuestionnaireResponse endpoint.
*/


export async function getSurveyResponses(serverUrl, patientId, surveyDate) {
  try {
    const searchParams = new URLSearchParams({
      subject: `Patient/${patientId}`,
      authored: `eq${surveyDate}T00:00:00Z`, // Find responses on that date
    });

    const response = await fetch(
      `${serverUrl}/QuestionnaireResponse?${searchParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/fhir+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const bundle = await response.json();

    if (!bundle || !bundle.entry) {
      console.log("No survey responses found.");
      return null;
    }

    return bundle.entry.map((entry) => entry.resource); // Extract the QuestionnaireResponse resources.
  } catch (error) {
    console.error("Error retrieving survey responses:", error);
    return null;
  }
}


/*
Takes a QuestionnaireResponse resource as input.
Iterates through the item array (questions and answers).
Extracts the answer value based on its data type (valueInteger, valueBoolean, valueString, valueTime).
Returns an object where the keys are the linkId values (question names) and the values are the corresponding answers.
*/

export function extractAnswers(questionnaireResponse) {
  if (!questionnaireResponse || !questionnaireResponse.item) {
    return null;
  }

  const answers = {};

  questionnaireResponse.item.forEach((item) => {
    if (item.answer && item.answer.length > 0) {
      const answer = item.answer[0]; // Assuming only one answer per question

      if (answer.valueInteger !== undefined) {
        answers[item.linkId] = answer.valueInteger;
      } else if (answer.valueBoolean !== undefined) {
        answers[item.linkId] = answer.valueBoolean;
      } else if (answer.valueString !== undefined) {
        answers[item.linkId] = answer.valueString;
      } else if (answer.valueTime !== undefined){
        answers[item.linkId] = answer.valueTime;
      } else {
        answers[item.linkId] = null; // No valid answer found
      }
    } else {
      answers[item.linkId] = null; // No answer provided
    }
  });

  return answers;
}

// Example usage:
const serverUrlget = "YOUR_FHIR_SERVER_URL"; // Replace with your server URL
const patientId = "patient-123";
const surveyDate = "2023-10-27";


/*
Calls getSurveyResponses to retrieve the responses.
If responses are found, it iterates through them and calls extractAnswers for each response.
The extracted answers are then logged to the console, and individual answers are accessed as variables.
*/

getSurveyResponses(serverUrl, patientId, surveyDate).then((responses) => {
  if (responses) {
    responses.forEach((response) => {
      const answers = extractAnswers(response);
      if (answers) {
        console.log("Extracted Answers:", answers);

        // Access individual answers as variables:
        const bedtime = answers.bedtime;
        const sleepLatency = answers.sleep_latency;
        const sleepQuality = answers.sleep_quality;
        const sleepNotes = answers.sleep_notes;
        const substanceUse = answers.substance_use;

        console.log("Bedtime:", bedtime);
        console.log("Sleep Latency:", sleepLatency);
        console.log("Sleep Quality:", sleepQuality);
        console.log("Sleep notes:", sleepNotes);
        console.log("Substance Use:", substanceUse);

        // ... access other answers similarly
      }
    });
  }
});



/*
Get patient's medications and conditions from fhir server
*/

export async function extractMedicationAndConditions(serverUrl, patientId) {
  try {
    // 1. Get MedicationStatements
    const medicationStatements = await getMedicationStatements(serverUrl, patientId);

    // 2. Get Conditions
    const conditions = await getConditions(serverUrl, patientId);

    // 3. Extract Medication Data
    const medications = extractMedicationData(medicationStatements);

    // 4. Extract Condition Data
    const relevantConditions = extractRelevantConditions(conditions);

    return {
      medications: medications,
      conditions: relevantConditions,
    };
  } catch (error) {
    console.error("Error extracting data:", error);
    return null;
  }
}

async function getMedicationStatements(serverUrl, patientId) {
  const searchParams = new URLSearchParams({
    subject: `Patient/${patientId}`,
  });

  const response = await fetch(
    `${serverUrl}/MedicationStatement?${searchParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/fhir+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const bundle = await response.json();
  if (!bundle || !bundle.entry) return [];
  return bundle.entry.map((entry) => entry.resource);
}

async function getConditions(serverUrl, patientId) {
  const searchParams = new URLSearchParams({
    subject: `Patient/${patientId}`,
  });

  const response = await fetch(`${serverUrl}/Condition?${searchParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const bundle = await response.json();
  if (!bundle || !bundle.entry) return [];
  return bundle.entry.map((entry) => entry.resource);
}


export function extractMedicationData(medicationStatements) {
  if (!medicationStatements) return [];

  return medicationStatements.map((statement) => {
    const medicationName =
      statement.medicationCodeableConcept?.text ||
      statement.medicationCodeableConcept?.coding?.[0]?.display ||
      "Unknown Medication";
    const dose = statement.dosage?.[0]?.doseQuantity?.value
      ? `${statement.dosage[0].doseQuantity.value} ${statement.dosage[0].doseQuantity.unit}`
      : "Unknown Dose";
    return {
      medicationName: medicationName,
      dose: dose,
    };
  });
}

export function extractRelevantConditions(conditions) {
  if (!conditions) return [];

  const relevantConditions = [];
  const targetCodes = ["3981000124103", "73211009"]; // SNOMED CT codes for hypertension and diabetes

  conditions.forEach((condition) => {
    const code = condition.code?.coding?.[0]?.code;
    const display = condition.code?.coding?.[0]?.display;

    if (targetCodes.includes(code)) {
      relevantConditions.push(display);
    }
  });

  return relevantConditions;
}

// Example usage:
// const serverUrl = "YOUR_FHIR_SERVER_URL"; // Replace with your server URL
// const patientId = "patient-123";

MedicationAndConditionsObject(serverUrl, patientId).then((data) => {
  if (data) {
    console.log("Medications:", data.medications);
    console.log("Conditions:", data.conditions);

    // Access variables:
    const medications = data.medications; // array of objects
    const conditions = data.conditions; // array of strings.

    if(medications && medications.length > 0){
        medications.forEach(medication => {
            console.log("Medication name: ", medication.medicationName);
            console.log("Medication dose: ", medication.dose);
        })
    }
    if(conditions && conditions.length > 0){
        conditions.forEach(condition => {
            console.log("Condition: ", condition);
        })
    }
  }
});


