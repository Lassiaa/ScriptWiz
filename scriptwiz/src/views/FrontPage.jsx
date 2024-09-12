import { useEffect, useState } from "react";

import style from "../assets/style";

function FrontPage() {
  // State to check if a file has been uploaded
  const [isFile, setFile] = useState(false);

  // Check if there already is a script in local storage
  useEffect(() => {
    if (localStorage.getItem("script")) {
      setFile(true);
    }
  }, []);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);

        localStorage.setItem("script", JSON.stringify(jsonContent));
        setFile(true);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div className={style.frontPageBody}>
      <h1 className={style.frontPageHeading}>ScriptWiz</h1>
      <p>Please upload your .json file to start</p>
      <div className={style.card}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={style.fileIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        {!isFile ? (
          <p className={style.fileInfo}>No file uploaded.</p>
        ) : (
          <p className={style.fileInfo}>File uploaded successfully!</p>
        )}
        <label htmlFor="file-upload" className={style.fileUpload}>
          Upload
        </label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
      </div>
      <button
        className={`p-2 px-4 rounded text-white 
          ${
            isFile
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        disabled={!isFile}
      >
        Generate timeline overview
      </button>
    </div>
  );
}

export default FrontPage;
