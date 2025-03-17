import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';


function Logs() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Sleep Log Page (Route) </h1>

            <div className='mt-20'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker /> 
                <span>at</span>
                <TimePicker />
                
              </LocalizationProvider>  
            </div>
            <div className='mt-20'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
                <span>at</span>
                <TimePicker />
                
              </LocalizationProvider>  
            </div>
            <div className="mt-20">
                <DashboardCard12 />
            </div>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"> 
                {/* <DatePicker />       */}
            </div>


            </div>
          </div>
         </main>
      </div>
    </div>
    )


}

export default Logs;