import { useEffect, useState } from "react";
import style from "../assets/style";
import { setScript } from "../db/firestoreService";
import { useFileContext } from "../contexts/fileContext";
import { makeApiRequest, roles } from "../utils/openai";

function FrontPage() {
  const [isFile, setFile] = useState(false);
  const [scriptContent, setScriptContent] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const { setFileName } = useFileContext();

  // Check if there already is a script in local storage
  useEffect(() => {
    if (localStorage.getItem("script")) {
      setFile(true);
      setScriptContent(localStorage.getItem("script"));
      console.log("Script content:", scriptContent);
    }
  }, []);

  // Function to parse the character string
  const parseCharacterString = (str) => {
    return str.split("\n").map((line) => {
      const [name, details] = line.split(" (");
      const ageScenes = details
        .slice(0, -1)
        .split("; ")
        .map((item) => {
          const ageMatch = item.match(/age ([^ ]+)/);
          const sceneMatch = item.match(/scene ([^ ]+)/);
          return {
            age: ageMatch ? ageMatch[1] : null,
            scene: sceneMatch ? sceneMatch[1] : null,
          };
        });
      return {
        name: name.trim(),
        ageScenes,
      };
    });
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        console.log("Script content:", scriptContent);
        const jsonContent = JSON.parse(e.target.result);

        localStorage.setItem("script", JSON.stringify(jsonContent));
        setFile(true);
        setFileName(file.name);

        // set the script with parsed characters
        const parsedCharacters = parseCharacterString(jsonContent.metadata);
        // set the script with all the listed scenes
        const scenes = jsonContent.scenes

        await setScript(file.name, "characters", { parsedCharacters });
        await setScript(file.name, "scenes", { scenes });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  // Handle generate click and make API request
  const handleGenerateClick = async () => {
    if (scriptContent) {
      try {
        const aiPrompt = scriptContent;
        // const aiRole = roles.jsonReader;
        const aiRole = roles.jsonReader;
        const aiResult = await makeApiRequest(aiPrompt, aiRole);
        setAiResponse(aiResult);
      } catch (error) {
        console.error("Error generating response:", error);
        setAiResponse({
          error: "Failed to generate response. Please try again later.",
        });
      }
    } else {
      console.warn("No script content available to generate AI response.");
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
        onClick={handleGenerateClick}
      >
        Generate timeline overview
      </button>
      {aiResponse && (
        <div className={style.aiResponse}>
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default FrontPage;
