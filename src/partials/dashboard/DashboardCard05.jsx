import React, { useEffect, useContext, useState } from "react";
import DataContext from "../../utils/DataContext";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import parse from 'html-react-parser';


function extractAnswers(questionnaireResponse) {
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
      } else if (answer.valueTime !== undefined) {
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

const survey = `What time did you go to bed last night?
How long did it take you to fall asleep (In minutes)?
What time did you wake up this morning?
How many times did you wake up during the night?
How long were you awake during the night in total (waso), in minutes?

How would you rate the quality of your sleep last night?
1 - Extremely poor
2 - Poor
3 - Average
4 - Good
5 - Excellent

 Did you feel rested when you woke up this morning?
1 - Severely unrested
2 - Not rested
3 - Somewhat rested
4 - Rested
5 - Very rested

Enter any pertinent notes about your sleep:
Did you consume caffeine or alcohol before bed?

Did you use any electronic devices (e.g., phone, TV) before bed?

Did you follow a bedtime routine (e.g., reading, meditation)?

`;

function DashboardCard05() {
  const {
    ISI,
    insights,
    setInsights,
    responses,
    medications,
    conditions,
    setError,
    surveyCompleted,
    setSurveyCompleted
  } = useContext(DataContext);
  //
  const [loading, setLoading] = useState(false);

 
        useEffect(() => {
          //
          if (surveyCompleted) {
            //
            setLoading(true);
            //
            axios
              .post(
                "https://slumbr-lambda-1071299687549.us-central1.run.app/api/insights",
                {
                  promptTemplate: `Analyze this questionnaire: ${JSON.stringify(survey)}, and the following data containing a patient's insomnia questionnaire responses ${JSON.stringify(
                    responses
                  )}, medical conditions ${JSON.stringify(
                    conditions
                  )}, insomnia severity index ${ISI} and current medications ${JSON.stringify(
                    medications
                  )}. Generate only the top 5 evidence-based, personalized suggestions to improve their sleep efficacy and quality. For each suggestion, provide:
            
                Change: A clear, specific action or adjustment (e.g., medication timing, sleep hygiene tweak, or lifestyle modification).
                Rationale: A brief explanation of why this change may help, referencing their conditions/medications if relevant (e.g., "Because you take [Medication X], which can disrupt REM sleep, adding magnesium-rich foods may counteract this side effect.").
                Expected Benefit: The likely outcome (e.g., "This may reduce sleep latency by 20–30 minutes" or "Could improve deep sleep cycles").
            
                Prioritize changes that address the client’s biggest sleep barriers (e.g., fragmented sleep, difficulty falling asleep, or daytime fatigue) while considering their medical constraints. Format the output as a concise bulleted list, starting with the highest-impact change.Address the patient directly.
                
                First statement should read: 'Thank you for taking the assessment. Based on your insomnia questionnaire and your medical profile:'
                
                 Avoid asterixes in response and provide response in the following HTML template, grouping each change, rationale and benefit together in one div:
                
                <div className="mt-5"> 
                    <h4 className="mt-3 text-lg font-bold" >{change here}</h4>
                    <p className="mt-3">{rationale here}</p>
                    <p className="mt-3 border-b-2 border-gray-300 pb-3">{expected benefit here}</p>
                </div>

                At the end of the responses add the following disclaimer:

                "Note: This is not a susbstitute for medical advice. These recommendations should be reviewed with a healthcare provider to align with your full medical history."
                `,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                  const output = response.data.insights;
                  const htmlFormat = output.replace('```html', '').replace('```', '').replace('*', '').trim();

                setInsights(htmlFormat);
                setLoading(false);
                setSurveyCompleted(false);
                console.log(htmlFormat);
              })
              .catch((err) => {
                setError(err.message || "Failed to get AI Analysis.");
                setLoading(false);
              });
          }
        }, [responses, ISI, medications, conditions]);
    
  


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 md:col-span-10 lg:col-span-12 p-15 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Actionable Sleep Insights
        </h2>
        {/* <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
        </Tooltip> */}
      </header>
      {ISI ? (
        <div className="text-sm font-medium text-green-800 px-4 py-5.5 bg-green-400/15 rounded-full m-5">
          A personalized recommendation has been generated for you based on your
          assessment and patient profile. Take these actions to begin improving
          your insomnia.
        </div>
      ) : (
        <div className="text-sm font-medium text-black-800 px-4 py-5.5 bg-amber-500/10 rounded-full m-5">
          Take the assessment to get a personalized recommendation on how to
          improve insomnia based on your profile...
        </div>
      )}

      <div className="mt-5">
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
      <div className="mt-5">
        {parse(insights)} 
      </div> 
    </div>
   );
  }


export default DashboardCard05;


 <div></div>
