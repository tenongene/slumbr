import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responses, setResponses] = useState(null);
    const [ISI, setISI] = useState(1);

  return (
    <DataContext.Provider value={{ responses, setResponses, ISI, setISI }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
