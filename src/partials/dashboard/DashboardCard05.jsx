import React, { useState, useEffect, useContext } from "react";
import Tooltip from "../../components/Tooltip";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import RealtimeChart from "../../charts/RealtimeChart";
import DataContext from "../../utils/DataContext";


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


function DashboardCard05() {
  const { responses } = useContext(DataContext);

  // useEffect(() => {
  //   const storedResponses = localStorage.getItem("surveyResponses");
  //   if (storedResponses) {
  //     setResponses(storedResponses);
  //   }
  // }, []);
  const surveyAnswers = extractAnswers(responses);

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

      <div className="text-sm font-medium text-green-800 px-4 py-5.5 bg-green-400/15 rounded-full m-5">
        A personalized recommendation has been generated for you based on your
        assessment and patient profile. Take these actions to begin improving
        your insomnia.
      </div>
      <div className="mt-5">
        {surveyAnswers}
      </div>
    </div>
  );
}

export default DashboardCard05;
