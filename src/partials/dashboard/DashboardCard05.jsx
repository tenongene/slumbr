import React, { useEffect, useContext, useState } from "react";
import DataContext from "../../utils/DataContext";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";

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

function DashboardCard05() {
  const { ISI, insights, setInsights, responses } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //
    if (responses) {
      axios
        .post(
          "/api/insights",
          { responses, ISI },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Data for insights posted successfully:", response.data);
          setInsights(response.data.insights);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to get AI Analysis.");
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
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

      {/* <div className="mt-5">
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
      </div> */}
      <div className="mt-5">{insights}</div>
    </div>
  );
}

export default DashboardCard05;
