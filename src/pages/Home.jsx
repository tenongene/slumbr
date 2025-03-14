import React, { useState } from 'react';
import 'survey-core/survey-core.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { ContrastDark } from "survey-core/themes";
import { ContrastLight } from "survey-core/themes";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Enter your first name:",
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  }]
};

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const survey = new Model(surveyJson);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

       {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Survey model={survey} />

         
      </div>


    </div>
    )


}

export default Home;