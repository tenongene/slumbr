import React, { useContext, useState, useEffect, useMemo } from "react";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";
import DataContext from "../../utils/DataContext";
import { CircularProgress, Box } from "@mui/material";

function DashboardCard01() {
  const { qualityArray } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (qualityArray) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [qualityArray]);

  const chartData = {
    labels: [
      "04-14-2025",
      "04-13-2025",
      "04-12-2025",
      "04-11-2025",
      "04-10-2025",
      "04-9-2025",
      "04-8-2025",
      "04-7-2025",
      "04-6-2025",
      "04-5-2025",
      "04-4-2025",
      "04-3-2025",
      "04-2-2025",
      "04-1-2025",
    ],
    datasets: [
      {
        data: qualityArray,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: adjustColorOpacity(
                getCssVariable("--color-violet-500"),
                0
              ),
            },
            {
              stop: 1,
              color: adjustColorOpacity(
                getCssVariable("--color-violet-500"),
                0.2
              ),
            },
          ]);
        },
        borderColor: getCssVariable("--color-violet-500"),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable("--color-violet-500"),
        pointHoverBackgroundColor: getCssVariable("--color-violet-500"),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Sleep Quality Summary
          </h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1"></div>
        <div className="flex items-start">
          <div className="text-sm text-gray-800 dark:text-gray-100 mr-2">
            Sleep rating trend over the past 2 weeks
          </div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full"></div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {qualityArray.length > 0 && (
          <LineChart data={chartData} width={389} height={128} />
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;
