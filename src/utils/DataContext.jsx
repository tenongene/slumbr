import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState(null);
  const [ISI, setISI] = useState(7);
	const [password, setPassword] = useState('');
  const [passMatch, setPassMatch] = useState('');
  const [patientId, setPatientId] = useState('806265ee-2f07-34d6-3c7e-16c9dae79041');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null); 
  const [email, setEmail] = useState("WilfStark@gmail.com"); 
  
  
 

  return (
    <DataContext.Provider value={{ responses, setResponses, ISI, setISI, patient, setPatient,loading, setLoading,error, setError, password, setPassword,email, setEmail, gender, setGender, city, setCity, state, setState, patientId, setPatientId, email, setEmail}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
