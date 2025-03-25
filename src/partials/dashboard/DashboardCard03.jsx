import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GaugeComponent } from "react-gauge-component";
import DataContext from "../../utils/DataContext";


const generateSeverity = (value) => {
  if (value >= 7 && value <= 14) {
    return value + ":  Clinically Insignificant";
  } else if (value > 14 && value <= 22) {
    return value + " : Subthreshold Insomnia";
  } else if (value > 22 && value <= 29) {
    return value + " : Moderate Insomnia";
  } else if (value > 29 && value <= 35) {
    return value + " : Severe Insomnia";
  }
};

function DashboardCard03() {
  const { ISI, setISI } = useContext(DataContext);

  useEffect(() => {
    const storedResponses = localStorage.getItem("surveyResponses");
    const responses = JSON.parse(storedResponses)
    const isi_score = 
        responses.falling_asleep +
          responses.staying_asleep +
          responses.early_wake +
          responses.sleep_pattern +
          responses.interference +
          responses.noticeable +
          responses.worry_level

    setISI(isi_score)
    
    
      
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white-50  dark:bg-gray-800 shadow-lg rounded-xl">
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
              value={ISI}
              minValue={7} 
              maxValue={35}
              type="radial"
              labels={{
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 7 },
                    { value: 14 },
                    { value: 22 },
                    { value: 29 },
                    { value: 35 },
                  ],
                },
                valueLabel: {
                  matchColorWithArc: "True",
                  style: {fontSize: "68px", textShadow: "black 5px 0px 5px, black 0px 0px 2.5em, gray 0px 0px 0.3em"},
                  formatTextValue: generateSeverity,
                },
              }} 
              arc={{
                colorArray: ["rgb(91, 225, 44)", "#92CC74", "#F29624", "#D1023D"],
                subArcs: [{ limit: 14, color: "rgb(91, 225, 44)"}, {limit: 22, color: "#92CC74"}, {limit: 29, color: "#F29624"}, {limit: 35, color: "#D1023D"}, {}],
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
