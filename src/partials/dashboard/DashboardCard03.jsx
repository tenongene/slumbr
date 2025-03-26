import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GaugeComponent } from "react-gauge-component";
import DataContext from "../../utils/DataContext";
import { Typography } from "@material-tailwind/react";


const generateSeverity = (value) => {
  let severityText = "";
  let color = "";

  if (value >= 7 && value <= 14) {
    severityText = value + ": Clinically Insignificant";
    color = " #0A751C ";
  } else if (value > 14 && value <= 22) {
    severityText = value + ": Subthreshold Insomnia";
    color = " #A5bb33 ";
  } else if (value > 22 && value <= 29) {
    severityText = value + ": Moderate Insomnia";
    color = " #CD8C14 ";
  } else if (value > 29 && value <= 35) {
    severityText = value + ": Severe Insomnia";
    color = " #CB4521 ";
  }

  return { text: severityText, color: color };
};

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

function DashboardCard03() {

  
  const { ISI, setISI, responses } = useContext(DataContext);
  const severityResult = generateSeverity(ISI);



  useEffect(() => {
    
  const surveyResponses = extractAnswers(responses);
  const isi_score = 
        surveyResponses.falling_asleep +
          surveyResponses.staying_asleep +
          surveyResponses.early_wake +
          surveyResponses.sleep_pattern +
          surveyResponses.interference +
          surveyResponses.noticeable +
          surveyResponses.worry_level

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
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2 mb-5">
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
                  style: {fontSize: "0px"},
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
              <Typography variant="h4" className="ml-5 pb-10" style={{ color: severityResult.color }}>
                {severityResult.text}
              </Typography>
      </div>
    </div>
  );
}

export default DashboardCard03;
