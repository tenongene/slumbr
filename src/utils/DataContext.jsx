import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState(null);
  const [ISI, setISI] = useState(7);
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [passMatch, setPassMatch] = useState('');
  const [patientId, setPatientId] = useState('736fadb2-44fe-55fc-4feb-fa096a4107c9')
 

  return (
    <DataContext.Provider value={{ responses, setResponses, ISI, setISI}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
