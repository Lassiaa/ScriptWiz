import { createContext, useContext, useState, useEffect } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileName, setFileName] = useState(
    localStorage.getItem("uploadedFile") || null
  );

  useEffect(() => {
    if (fileName) {
      localStorage.setItem("uploadedFile", fileName);
    } else {
      localStorage.removeItem("uploadedFile");
    }
  }, [fileName]);

  return (
    <FileContext.Provider value={{ fileName, setFileName }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
