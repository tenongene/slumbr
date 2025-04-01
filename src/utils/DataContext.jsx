import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState('');
  const [ISI, setISI] = useState(7);
  const [password, setPassword] = useState('');
  // const [passMatch, setPassMatch] = useState(null);
  const [patientId, setPatientId] = useState(localStorage.getItem('patientId'));
  const [patient, setPatient] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email'));

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
