import React, { useState, useContext } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import DataContext from "../utils/DataContext";


const surveyJson = {
  "completedHtml": "<h3>Thank you for completing the insomnia assessment!</h3>",
  "completedBeforeHtml": "<h3>You have already completed this assessment.</h3>",
  "loadingHtml": "<h3>Loading assessment...</h3>",
  "pages": [
    {
      "name": "page1",
      "title": "Insomnia Assessment",
      "description": "Answer questions about your sleep.",
      "elements": [
        {
          "type": "text",
          "name": "question 1",
          "title": "What time did you go to bed last night?",
          "inputType": "time"
        },
        {
          "type": "text",
          "name": "question2",
          "title": "How long did it take you to fall asleep?",
          "description": "In minutes",
          "readOnly": true,
          "inputType": "number"
        },
        {
          "type": "text",
          "name": "question 3",
          "title": "What time did you wake up this morning?",
          "inputType": "time"
        },
        {
          "type": "text",
          "name": "question4",
          "title": "How many times did you wake up during the night?",
          "inputType": "number"
        },
        {
          "type": "text",
          "name": "question 5",
          "title": "How long were you awake during the night in total?",
          "description": "In minutes",
          "inputType": "number"
        },
        {
          "type": "rating",
          "name": "question 6",
          "visible": false,
          "title": "How would you rate the quality of your sleep last night?",
          "description": "1 - Extremely poor\n2 - Poor\n3 - Average\n4 - Good\n5 - Excellent"
        },
        {
          "type": "rating",
          "name": "question 7",
          "title": " Did you feel rested when you woke up this morning?",
          "description": "1 - Severely unrested\n2 - Not rested\n3 - Somewhat rested\n4 - Rested\n5 - Very rested"
        },
        {
          "type": "boolean",
          "name": "question 8",
          "title": " Did you consume caffeine or alcohol before bed?"
        },
        {
          "type": "boolean",
          "name": "question 9",
          "title": "Did you use any electronic devices (e.g., phone, TV) before bed?"
        },
        {
          "type": "boolean",
          "name": "question 10",
          "title": "Did you follow a bedtime routine (e.g., reading, meditation)?"
        }
      ]
    },
    {
      "name": "page2",
      "title": "Insomnia Severity Index Assessment",
      "description": "Measuring insomnia severity.",
      "elements": [
        {
          "type": "rating",
          "name": "question1",
          "title": "Please rate the SEVERITY of your difficulty falling asleep within the last 2 weeks:\n",
          "description": "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very "
        },
        {
          "type": "rating",
          "name": "question 2",
          "title": "Please rate the SEVERITY of your difficulty staying asleep within the last 2 weeks:",
          "description": "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very "
        },
        {
          "type": "rating",
          "name": "question3",
          "title": "Please rate the SEVERITY of waking up too early within the last 2 weeks:",
          "description": "1 - None\n2 - Mild\n3 - Moderate\n4 - Severe\n5 - Very "
        },
        {
          "type": "rating",
          "name": "question 4",
          "title": "How SATISFIED/dissatisfied are you with your current sleep pattern?   ",
          "description": "1 - Very satisfied\n2 - Satisfied\n3 - Somewhat satisfied\n4 - Dissatisfied\n5 - Very dissatisfied"
        },
        {
          "type": "rating",
          "name": "question5",
          "title": " To what extent do you consider your sleep problem to INTERFERE with your daily functioning (e.g. daytime fatigue, ability to function at work/daily chores, concentration, memory, mood, etc.) ",
          "description": "1 - Not at all interfering\n2 - A little interfering\n3 - Somewhat interfering\n4 - Much interfering\n5 - Very much interfering"
        },
        {
          "type": "rating",
          "name": "question6",
          "title": "How NOTICEABLE to others do you think your sleep problem is in terms of impairing the quality of your life? ",
          "description": "1 - Not noticeable at all\n2 - A little noticeable\n3 - Somewhat noticeable\n4 - Much noticeable\n5 - Very much noticeable"
        },
        {
          "type": "rating",
          "name": "question7",
          "title": "How WORRIED/distressed are you about your current sleep problem? ",
          "description": "1 - Not worried at all\n2 - A little worried\n3 - Somewhat worried\n4 - Much worried\n5 - Very much worried\n"
        }
      ]
    }
  ],
  "navigateToUrl": "http://localhost:5173/dashboard",
  "navigateToUrlOnCondition": [
    {},
    {}
  ],
  "headerView": "advanced"
}

function SurveyPage() {

  const responses = useContext(DataContext)


    const survey = new Model(surveyJson);
    survey.onComplete.add((sender, options) => {
        setResponses(JSON.stringify(sender.data));
        console.log(JSON.stringify(sender.data, null, 3));
    });
    return (
      <div>
        <Survey model={survey} />
      </div>
      
  );

}

export default SurveyPage;
