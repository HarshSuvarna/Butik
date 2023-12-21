import React, { createContext, useContext, useState } from "react";

// Create a context with an object containing multiple values
const MyContext = createContext();

const MyProvider = ({ children }) => {
  // Use state to store the values of multiple components
  const [contextValues, setContextValues] = useState({});
  // Create a function to update the values
  const updateContextValue = (key, value) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  // Provide the context value and update function to the components
  return (
    <MyContext.Provider value={{ contextValues, updateContextValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to simplify accessing the context
const useMyContext = () => {
  return useContext(MyContext);
};

export { MyProvider, useMyContext };
