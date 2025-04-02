import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState('');
  const [ISI, setISI] = useState(7);
  const [password, setPassword] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [medications, setMedications] = useState([]);
  const [ conditions, setConditions] = useState([]);

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
        medications, 
        setMedications,
        conditions,
        setConditions
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
