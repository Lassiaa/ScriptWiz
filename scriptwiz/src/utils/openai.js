import axios from "axios";
import { setScript } from "../db/firestoreService";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
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
  scheduler:
    "As an AI tool, you read the given JSON data that contains the script of a movie. Then generate a filming schedule based on the scenes and characters in the script. Return the schedule in a json format.",
  mainCharacter:
    "As an AI tool, you read the given JSON data that contains the script of a movie. Then generate a list of what you think are the main characters. Return the schedule in a json format.",
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
const writeToLog = async (
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
    timestamp: new Date().toISOString(),
  };

  try {
    const logId = `log_${Date.now()}`;
    const result = await setScript("aiLogs", logId, logEntry);

    if (result.success) {
      console.log("Log saved successfully with ID:", logId);
    } else {
      console.error("Error saving log:", result.message);
    }
  } catch (error) {
    console.error("Error writing to Firestore:", error);
  }
};

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

export { makeApiRequest, roles };
