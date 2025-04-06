import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import DataContext from "../utils/DataContext";
import { CircularProgress, Box } from "@mui/material";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Profile() {
  const {
    patientId,
    patient,
    gender,
    city,
    state,
    loading,
    setLoading,
    error,
    setError,
    email,
    medications,
    setMedications,
    conditions,
    setConditions,
  } = useContext(DataContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  //Fetch medications on page load
  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `/api/healthcare/medications/${patientId}`
        );
        console.log(response.data);
        setMedications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch medications.");
        setLoading(false);
      }
    };

    if (patientId) {
      fetchMedications();
    }
  }, [patientId]);

  //Fetch Conditions on page load
  useEffect(() => {
    const fetchConditions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `/api/healthcare/conditions/${patientId}`
        );
        setConditions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch conditions.");
        setLoading(false);
      }
    };

    if (patientId) {
      fetchConditions();
    }
  }, [medications]);

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
                  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                    Patient Profile
                  </h1>
                </div>

                {/* Cards with List - Demographics*/}
                <div>
                  <Card className="w-96 p-10 mb-10">
                    {loading ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
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
                            className="mb-1"
                          >
                            <h5>
                              <em>{email}</em>
                            </h5>
                          </Typography>
                          <Typography variant="small" color="gray">
                            Patient ID: {patientId}
                          </Typography>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {/* =============================  */}
                          <div className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div className="flex items-center gap-x-3">
                              <div>
                                <Typography color="gray" variant="h6">
                                  Gender: {capitalize(gender)}
                                </Typography>
                                <Typography color="gray" variant="h6">
                                  Location: {`${city}, ${state}`}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          {/* ==================================== */}
                        </div>
                      </CardBody>
                    )}
                  </Card>
                </div>

                {/* Cards with List - Medications*/}
                <div>
                  <Card className="w-96 p-10">
                    <CardBody>
                      <div className="mb-5 flex items-center justify-between">
                        <Typography variant="h3" color="blue-gray" className="">
                          Current Medications
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue"
                          className="font-bold"
                        ></Typography>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {loading ? (
                          <p>Loading Patient Medications....</p>
                        ) : error ? (
                          <p>Error: {error}</p>
                        ) : !patientId ? (
                          <p>Please provide a patient ID.</p>
                        ) : medications.length === 0 ? (
                          <p>No Medications found for this patient.</p>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {medications.map((medication, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                              >
                                <div className="flex items-center gap-x-3">
                                  <div>
                                    <Typography color="blue-gray" variant="h6">
                                      {medication ||
                                        "Medication Name Unavailable"}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Cards with List - Conditions*/}
                <div>
                  <Card className="w-96 p-10 mt-10">
                    <CardBody>
                      <div className="mb-4 flex items-center justify-between">
                        <Typography variant="h3" color="blue-gray" className="">
                          Active Conditions
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue"
                          className="font-bold"
                        ></Typography>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {loading ? (
                          <p>Loading Patient Conditions....</p>
                        ) : error ? (
                          <p>Error: {error}</p>
                        ) : !patientId ? (
                          <p>Please provide a patient ID.</p>
                        ) : conditions.length === 0 ? (
                          <p>No Conditions found for this patient.</p>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {conditions.map((condition, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                              >
                                <div className="flex items-center gap-x-3">
                                  <div>
                                    <Typography color="blue-gray" variant="h6">
                                      {condition.code?.text ||
                                        "Condition Name Unavailable"}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
