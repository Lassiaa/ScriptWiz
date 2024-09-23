import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileName, setFileName] = useState(null);

  return (
    <FileContext.Provider value={{ fileName, setFileName }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
