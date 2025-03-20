import React from 'react';

function DashboardCard12({date, time, rate, notes}) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Your sleep diary over the past week</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
    
        <div>
          <ul className="my-1">

            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3">
                <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                  <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
                </svg>
              </div>
              <div className="grow flex items-center text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">On {date}, you slept for {time} hours, and you rated your sleep quality as {rate}.</div>
                  <div className="self-center font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">Your sleep note: {notes}.</div>

                </div>
              </div>
            </li>
          </ul>
        </div>
    
 

      </div>
    </div>
  );
}

export default DashboardCard12;
