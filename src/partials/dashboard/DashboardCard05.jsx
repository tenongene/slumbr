import React, { useState, useEffect, useContext } from "react";
import Tooltip from "../../components/Tooltip";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import RealtimeChart from "../../charts/RealtimeChart";
import DataContext from "../../utils/DataContext";


function DashboardCard05() {
  const { responses, setResponses } = useContext(DataContext);

  useEffect(() => {
    const storedResponses = localStorage.getItem("surveyResponses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
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
        {responses && <pre>{JSON.stringify(responses, null, 2)}</pre>}
        {!responses && <p>No responses found.</p>}
      </div>
    </div>
  );
}

export default DashboardCard05;
