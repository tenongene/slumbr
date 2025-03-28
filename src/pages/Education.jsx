import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import MediaCard1 from "../partials/dashboard/MediaCard1";
import MediaCard2 from "../partials/dashboard/MediaCard2";
import MediaCard3 from "../partials/dashboard/MediaCard3";
import MediaCard4 from "../partials/dashboard/MediaCard4";
import { Stack } from "rsuite";

function Education() {
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Sleep Education{" "}
                </h1>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mt-20"></div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-10">    
                    <MediaCard1 />
                    <MediaCard2 />
                    <MediaCard3 />
                    <MediaCard4 />
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Education;
