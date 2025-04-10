import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DataContext from "../utils/DataContext";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import { formatArray } from "../utils/Utils";


function Dashboard() {
  //
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setQualityArray, setSeverityArray} = useContext(DataContext);
  const email = localStorage.getItem("email");


    useEffect(() => {
      //
      const timeoutId = setTimeout(() => {
          //
            const fetchData = async () => {
              
              try {
                const response = await axios.get("https://slumbr-lambda-1071299687549.us-central1.run.app/api/chartdata", {
                  params: { email: email },
                });

                const fSeverityArray = formatArray(response.data.severityIndex, 14);
                const fQualityArray = formatArray(response.data.sleepQuality, 14);

                setSeverityArray(fSeverityArray);
                setQualityArray(fQualityArray);

                console.log(response.data.severityIndex);
                console.log(response.data.sleepQuality);
              } catch (err) {
                console.log(err.message);
              }
            };
              fetchData();
        }, 2000);

      return () => clearTimeout(timeoutId);
  
    }, []);

  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Your Sleep Dashboard
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
