import React, { useContext } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import DataContext from "../utils/DataContext";
import axios from "axios";
import { setLocalStorageItems } from "../utils/LocalStorageHandler";


const surveyJson = {
  completedHtml:
    "<h3>Thank you for completing the insomnia assessment! Redirecting to patient dashboard ......</h3>",
  completedBeforeHtml: "<h3>You have already completed this assessment.</h3>",
  loadingHtml: "<h3>Loading assessment...</h3>",
  pages: [
    {
      name: "page1",
      title: "Insomnia Assessment",
      description: "Answer questions about your sleep.",
      elements: [
        {
          type: "text",
          name: "bedtime",
          title: "What time did you go to bed last night?",
          inputType: "time",
          
        },
        {
          type: "text",
          name: "sleep_latency",
          title: "How long did it take you to fall asleep?",
          description: "In minutes",
          inputType: "number",
        },
        {
          type: "text",
          name: "wakeup_time",
          title: "What time did you wake up this morning?",
          inputType: "time",
        },
        {
          type: "text",
          name: "night_awakenings",
          title: "How many times did you wake up during the night?",
          inputType: "number",
        },
        {
          type: "text",
          name: "waso",
          title: "How long were you awake during the night in total?",
          description: "In minutes",
          inputType: "number",
        },
        {
          type: "rating",
          name: "sleep_quality",
          title: "How would you rate the quality of your sleep last night?",
          description:
            "1 - Extremely poor\n2 - Poor\n3 - Average\n4 - Good\n5 - Excellent",
        },
        {
          type: "rating",
          name: "restorative_sleep",
          title: " Did you feel rested when you woke up this morning?",
          description:
            "1 - Severely unrested\n2 - Not rested\n3 - Somewhat rested\n4 - Rested\n5 - Very rested",
        },
        {
          "type": "comment",
          "name": "sleep_notes",
          "title": "Enter any pertinent notes about your sleep:",
        },
        {
          type: "boolean",
          name: "substance_use",
          title: "Did you consume caffeine or alcohol before bed?",
        },
        {
          type: "boolean",
          name: "device_use",
          title:
            "Did you use any electronic devices (e.g., phone, TV) before bed?",
        },
        {
          type: "boolean",
          name: "bedtime_routine",
          title:
            "Did you follow a bedtime routine (e.g., reading, meditation)?",
        },
      ],
    },
    {
      name: "page2",
      title: "Insomnia Severity Index Assessment",
      description: "Measuring insomnia severity.",
      elements: [
        {
          type: "rating",
          name: "falling_asleep",
          title:
            "Please rate the SEVERITY of your difficulty falling asleep within the last 2 weeks:\n",
          description:
            "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very Severe",
        },
        {
          type: "rating",
          name: "staying_asleep",
          title:
            "Please rate the SEVERITY of your difficulty staying asleep within the last 2 weeks:",
          description:
            "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very Severe",
        },
        {
          type: "rating",
          name: "early_wake",
          title:
            "Please rate the SEVERITY of waking up too early within the last 2 weeks:",
          description:
            "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very Severe",
        },
        {
          type: "rating",
          name: "sleep_pattern",
          title:
            "How SATISFIED/dissatisfied are you with your current sleep pattern?   ",
          description:
            "1 - Very satisfied\n2 - Satisfied\n3 - Somewhat satisfied\n4 - Dissatisfied\n5 - Very dissatisfied",
        },
        {
          type: "rating",
          name: "interference",
          title:
            " To what extent do you consider your sleep problem to INTERFERE with your daily functioning (e.g. daytime fatigue, ability to function at work/daily chores, concentration, memory, mood, etc.) ",
          description:
            "1 - Not at all interfering\n2 - A little interfering\n3 - Somewhat interfering\n4 - Much interfering\n5 - Very much interfering",
        },
        {
          type: "rating",
          name: "noticeable",
          title:
            "How NOTICEABLE to others do you think your sleep problem is in terms of impairing the quality of your life? ",
          description:
            "1 - Not noticeable at all\n2 - A little noticeable\n3 - Somewhat noticeable\n4 - Much noticeable\n5 - Very much noticeable",
        },
        {
          type: "rating",
          name: "worry_level",
          title:
            "How WORRIED/distressed are you about your current sleep problem? ",
          description:
            "1 - Not worried at all\n2 - A little worried\n3 - Somewhat worried\n4 - Much worried\n5 - Very much worried\n",
        },
      ],
    },
  ],
  navigateToUrl: "/dashboard",
  headerView: "advanced",
};

function convertSurveyJsonToFhir(surveyJson, responses, patientId) {
    const fhirResource = {
    resourceType: "QuestionnaireResponse",
    status: "completed",
    subject: {
      reference: `Patient/${patientId}`, // Replace with actual patient reference
    },
    authored: new Date().toISOString(),
    questionnaire: "Questionnaire/insomnia-assessment", // Replace with actual Questionnaire reference if applicable
    item: [],
  };

  if (!responses) {
    return null; // Handle missing responses
  }

  // Map survey questions to FHIR QuestionnaireResponse items
  const questionMap = {
    bedtime: { linkId: "bedtime", type: "time" },
    sleep_latency: { linkId: "sleep-latency", type: "integer" },
    wakeup_time: { linkId: "wakeup-time", type: "time" },
    night_awakenings: { linkId: "night-awakenings", type: "integer" },
    waso: { linkId: "waso", type: "integer" },
    sleep_quality: { linkId: "sleep-quality", type: "integer" },
    restorative_sleep: { linkId: "restorative-sleep", type: "integer" },
    sleep_notes: { linkId: "sleep-notes", type: "string" },
    substance_use: { linkId: "substance-use", type: "boolean" },
    device_use: { linkId: "device-use", type: "boolean" },
    bedtime_routine: { linkId: "bedtime-routine", type: "boolean" },
    falling_asleep: { linkId: "falling-asleep", type: "integer" },
    staying_asleep: { linkId: "staying-asleep", type: "integer" },
    early_wake: { linkId: "early-wake", type: "integer" },
    sleep_pattern: { linkId: "sleep-pattern", type: "integer" },
    interference: { linkId: "interference", type: "integer" },
    noticeable: { linkId: "noticeable", type: "integer" },
    worry_level: { linkId: "worry-level", type: "integer" },
  };

  for (const key in responses) {
    if (questionMap[key]) {
      const item = {
        linkId: questionMap[key].linkId,
        answer: [
          {
            valueTime: questionMap[key].type === "time" ? responses[key] : undefined,
            valueInteger: questionMap[key].type === "integer" ? responses[key] : undefined,
            valueString: questionMap[key].type === "string" ? responses[key] : undefined,
            valueBoolean: questionMap[key].type === "boolean" ? responses[key] : undefined
          },
        ],
      };
      fhirResource.item.push(item);
    }
  }

  return fhirResource;
}


function SurveyPage() {
  //
  const { patientId } = useContext(DataContext);

  const id = "806265ee-2f07-34d6-3c7e-16c9dae79041"

  
  const survey = new Model(surveyJson);
  survey.onComplete.add((sender, options) => {
    const responses = sender.data;

    // Format times to Fhir format
    if (responses.wakeup_time) {
    responses.wakeup_time = `${responses.wakeup_time}:00`;
    }
    if (responses.bedtime) {
    responses.bedtime = `${responses.bedtime}:00`;
    }

    //Severity Index Values short-cut
    const severityResponses = {
      falling_asleep: responses.falling_asleep,
      staying_asleep: responses.staying_asleep,
      early_wake: responses.early_wake,
      sleep_pattern: responses.sleep_pattern,
      interference:responses.interference,
      noticeable: responses.noticeable,
      worry_level: responses.worry_level ,
    }
    setLocalStorageItems(severityResponses);
    //////////////////////////////////////////////////


    //
    const responseFhir = convertSurveyJsonToFhir(surveyJson, responses, id);
    console.log(responseFhir);

    if (responseFhir) {

 
      axios
        .post('/api/healthcare/', responseFhir, responseFhir.resourceType, responseFhir.questionnaire, responseFhir.status, responseFhir.subject.reference, 
          {headers: {
          'Content-Type': 'application/fhir+json',
            },
      })
        .then((response) => {
      
          console.log('QuestionnaireResponse posted successfully:', response);
    
        })
        .catch((error) => {
      
          console.error('Error posting QuestionnaireResponse:', error);
  
        });
      } else {
        console.error('QuestionnaireResponse is null..');
      }
      
  });






  return (
    <div>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyPage;
