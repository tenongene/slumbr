import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GaugeComponent } from "react-gauge-component";
import DataContext from "../../utils/DataContext";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

const generateSeverity = (value) => {
  if (value <= 20) {
    return value + ": Low";
  } else if (value > 20 && value <= 40) {
    return value + "% : Mild";
  } else if (value > 40 && value <= 60) {
    return value + "% : Moderate";
  } else if (value > 60 && value <= 80) {
    return value + "% : High";
  } else if (value > 80 && value <= 100) {
    return value + "% : Severe";
  }
};

function DashboardCard03() {
  // const { ISI, setISI } = useContext(DataContext);

  // useEffect(() => {
  //   const storedResponses = localStorage.getItem("surveyResponses");
  //   if (storedResponses) {
  //     const responses = JSON.parse(storedResponses);
  //     console.log(responses);
  //     setISI(
  //       responses.falling_asleep +
  //         responses.staying_asleep +
  //         responses.early_wake +
  //         responses.sleep_pattern +
  //         responses.interference +
  //         responses.noticeable +
  //         responses.worry_level
  //     );
  //   }
  // }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Insomnia Severity Index
          </h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1"></div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {" "}
            <GaugeComponent
              value={25}
              type="radial"
              labels={{
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 20 },
                    { value: 40 },
                    { value: 60 },
                    { value: 80 },
                    { value: 100 },
                  ],
                },
                valueLabel: {
                  matchColorWithArc: "True",
                  style: { fontSize: 45 },
                  formatTextValue: generateSeverity,
                },
              }}
              arc={{
                colorArray: ["#5BE12C", "#EA4228"],
                subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
                padding: 0.02,
                width: 0.3,
              }}
              pointer={{
                elastic: true,
                animationDelay: 0,
              }}
            />
          </div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
