import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import HomeImage from "../images/awake.jpg";
import Header from '../partials/Header';
import { Card, Typography, Button } from "@material-tailwind/react";


function Home() {

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

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" >
            <div className="mb-20">
              <Typography variant='h3'>
                Hello Elizabeth,
                </Typography>
                <Typography variant='h5'>
                  Welcome to Slumbr!
                </Typography>
              
            </div>
          <Card className="flex h-full w-full max-w-[40rem] flex-row ml=15">
              <Card.Header className="m-0 h-full w-2/5 shrink-0 rounded-r-none">
                <img
                  src= {HomeImage}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </Card.Header>
                  <Card.Body className="p-4">
                     <Typography
                  type="small"
                  className="mb-4 font-bold uppercase text-foreground"
                >
                  Insomnia
                </Typography>
                <Typography type="h5" className="mb-2">
      
                </Typography>
                <Typography className="mb-8 text-foreground">
                Insomnia is a common sleep disorder characterized by difficulty falling asleep, 
                staying asleep, or waking up too early, despite having adequate opportunity to sleep. 
                It can be a temporary or chronic condition. 
                <div className="mt-5">
                  <strong>Slumbr</strong> can help you manage insomnia based on your lifestyle and other 
                factors that influence your sleep quality. 
                Please complete the assessment to analyze changes in your lifestyle and to receive a personalized recommendation on steps
                to get you sleeping again!
                </div>
                </Typography>
                <Link to="/survey">
                  <Button as="a" href="#" className="mb-2 pl-3 flex w-fit items-right gap-4">
                    Begin Assessment
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
                
              </Card.Body>
            </Card>
          </div> 

        </main>
         
      </div>


    </div>
    )


}

export default Home;