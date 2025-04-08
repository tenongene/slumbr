import React, { useEffect, useContext, useState } from "react";
import DataContext from "../../utils/DataContext";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import Typography from "@mui/material";

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
  } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    if (responses && ISI && medications && conditions) {
      setLoading(true);

      //
      axios
        .post(
          "/api/insights",
          {
            promptTemplate: `Analyze the provided data containing a patient's insomnia survey responses ${JSON.stringify(
              responses
            )}, medical conditions ${JSON.stringify(
              conditions
            )}, insomnia severity index ${ISI} and current medications ${JSON.stringify(
              medications
            )}. Generate the top 3 evidence-based, personalized suggestions to improve their sleep efficacy and quality. For each suggestion, provide:
      
          Change: A clear, specific action or adjustment (e.g., medication timing, sleep hygiene tweak, or lifestyle modification).
      
          Rationale: A brief explanation of why this change may help, referencing their conditions/medications if relevant (e.g., "Because you take [Medication X], which can disrupt REM sleep, adding magnesium-rich foods may counteract this side effect.").
      
          Expected Benefit: The likely outcome (e.g., "This may reduce sleep latency by 20–30 minutes" or "Could improve deep sleep cycles").
      
          Prioritize changes that address the client’s biggest sleep barriers (e.g., fragmented sleep, difficulty falling asleep, or daytime fatigue) while considering their medical constraints. Format the output as a concise bulleted list, starting with the highest-impact change.Address the patient directly.`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const formatResponse = response.data.insights
            .split("\n")
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ));

          setInsights(formatResponse);
          setLoading(false);
          console.log(response.data.insights);
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
      <Typography className="mt-5">{insights}</Typography>
    </div>
  );
}

export default DashboardCard05;
