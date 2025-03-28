import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState(null);
  const [ISI, setISI] = useState(7);
  const [password, setPassword] = useState("");
  const [passMatch, setPassMatch] = useState("");
  const [patientId, setPatientId] = useState(
    "d58e3bda-1f4f-c94a-bcde-155cc65b2b5a"
  );
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [email, setEmail] = useState("lbailey@gmail.com");

  return (
    <DataContext.Provider
      value={{
        responses,
        setResponses,
        ISI,
        setISI,
        patient,
        setPatient,
        loading,
        setLoading,
        error,
        setError,
        password,
        setPassword,
        gender,
        setGender,
        city,
        setCity,
        state,
        setState,
        patientId,
        setPatientId,
        email,
        setEmail,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
