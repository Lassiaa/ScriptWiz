import axios from "axios";

// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiKey = import.meta.env.VITE_TEST;
const endpoint = "https://api.openai.com/v1/chat/completions";

// Headers for the API request
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

// Roles for the AI tool
const roles = {
  jsonReader:
    "As an AI tool, you read the given JSON data that contains the script of a movie. Then you parse all of the relevant information. Return the name and synapses of the movie.",
  characteData:
    "As an AI tool, you read the given JSON data that contains the script of a movie. Get all data related to the characters in the script. Do not include any other information or any additional text and return as json. Just return the characters name, age, scenes and dialogues.",
};

// Request data for the API, define what model to use
const requestData = {
  model: "gpt-3.5-turbo-0125",
  messages: [
    {
      role: "user",
      content: " ",
    },
    {
      role: "system",
      content: " ",
    },
  ],
};

// Function to write to log file
const writeToLog = (
  model,
  tokenTotal,
  role,
  prompt,
  tokenPrompt,
  response,
  tokenResponse
) => {
  const logEntry = {
    model,
    role,
    tokenTotal,
    fullPrompt: {
      prompt,
      tokenPrompt,
    },
    fullResponse: {
      response,
      tokenResponse,
    },
  };

  let log = [];

  const logFileData = localStorage.getItem("aiLog.json");

  if (logFileData) {
    log = JSON.parse(logFileData);
  }

  log.push(logEntry);

  localStorage.setItem("aiLog.json", JSON.stringify(log, null, 2));
};

// Function to export log to JSON data
const exportToJSONFile = () => {
  const logData = localStorage.getItem("aiLog.json");
  if (logData) {
    const logJSON = JSON.parse(logData);
    const logJSONString = JSON.stringify(logJSON, null, 2);

    const blob = new Blob([logJSONString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "log.json";
    document.body.appendChild(a);

    a.click();

    URL.revokeObjectURL(url);
  } else {
    console.error("No log data found in localStorage.");
  }
};

let responseFinal;

const makeApiRequest = async (prompt, role) => {
  const maxRetries = 1;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      requestData.messages[1].content = role;
      requestData.messages[0].content = prompt;

      // Make the API request
      const response = await axios.post(endpoint, requestData, { headers });

      // Process and log the response
      const responseModel = response.data.model;
      const tokenTotal = response.data.usage.total_tokens;
      const tokenPrompt = response.data.usage.prompt_tokens;
      const tokenResponse = response.data.usage.completion_tokens;
      const responseRole = role;
      const responseText = response.data.choices[0].message.content;
      const promptText = requestData.messages[0].content;

      writeToLog(
        responseModel,
        tokenTotal,
        responseRole,
        promptText,
        tokenPrompt,
        responseText,
        tokenResponse
      );
      return responseText;
    } catch (error) {
      console.error(
        "API error:",
        error.response ? error.response.data : error.message
      );
      retries++;
    }
  }
};

export { makeApiRequest, exportToJSONFile, responseFinal, roles };
