import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import axios from 'axios';
import DataContext from '../utils/DataContext';



const customers = [
  {
    name: "Tania Andrew",
    email: "tania@gmail.com",
    price: 400,
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  },
  {
    name: "John Micheal",
    email: "john@gmail.com",
    price: 420,
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg",
  },
  {
    name: "Alexa Liras",
    email: "alexa@gmail.com",
    price: 340,
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  },
  {
    name: "Richard Gran",
    email: "richard@gmail.com",
    price: 520,
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  },
  {
    name: "Micheal Levi",
    email: "levi@gmail.com",
    price: 780,
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
  },
];
function capitalize (word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}


function Profile() {

  const {patientId, setPatient, patient, gender, city, state, loading, error, setLoading, setError, setGender, setCity, setState, email} = useContext(DataContext);

   useEffect(() => {
    if (!patientId) return; // Ensure patientId is provided

    axios
      .get(`http://localhost:3005/api/healthcare/patient/${patientId}`)
      .then((response) => {
        setPatient(`${response.data.name[0].given[0]} ${response.data.name[0].family}` );
        setGender(response.data.gender);
        setCity(response.data.address[0].city);
        setState(response.data.address[0].state);
        console.log(response.data)
      })
      .catch((err) => {
        setError(err.response?.data || "Error fetching patient");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]); // Runs when patientId changes



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
                <div className="mb-15">
                     <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Patient Profile</h1> 
                </div>
              
              



              {/* Cards with List - Demographics*/}
              <div>
                   <Card className="w-96 p-10 mb-10">
                      <CardBody>
                        <div className="mb-2 ">
                          <Typography variant="h3" color="blue-gray">
                            {patient}
                            {loading} 
                            {error}
                          </Typography>
                         
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue"
                          >
                            <h5>{email}</h5> 
                          </Typography>
                        </div>
                        <div className="divide-y divide-gray-200">

                         {/* =============================  */}
                            <div className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                              <div className="flex items-center gap-x-3">          
                                <div>
                                  <Typography color="blue-gray" variant="h6">
                                    Gender: {capitalize(gender)}
                                  </Typography>
                                  <Typography color="blue-gray" variant="h6">
                                    Location: {city},{state}
                                  </Typography>
                                  <Typography variant="small" color="gray">
                                  
                                  </Typography>
                                </div>
                              </div>
                            </div>
                         {/* ==================================== */}

                        </div>
                      </CardBody>
                    </Card>
              </div>



              {/* Cards with List - Conditions/Medications*/}
              <div>
                   <Card className="w-96 p-10">
                      <CardBody>
                        <div className="mb-4 flex items-center justify-between">
                          <Typography variant="h5" color="blue-gray" className="">
                         
                          </Typography>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue"
                            className="font-bold"
                          >
                      
                          </Typography>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {customers.map(({ name, email, price, image }, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                            >
                              <div className="flex items-center gap-x-3">
      
                                <div>
                                  <Typography color="blue-gray" variant="h6">
                                    {name}
                                  </Typography>
                                  <Typography variant="small" color="gray">
                                    {email}
                                  </Typography>
                                </div>
                              </div>
    
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
              </div>
            </div>
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"> 
                
                      
            </div>

            </div>
          </div>
         </main>
      </div>
    </div>
    )


}

export default Profile;