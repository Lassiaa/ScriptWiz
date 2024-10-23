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
    // "You generate a filming schedule in the most efficient way based on the scenes, characters, props, locations, and times indicated in the script. You then group the scenes by day starting from day 1. Ensure the filming days are arranged efficiently by grouping scenes with the same locations or characters where possible. Return the final schedule in a structured JSON format with the day, scenes, filming time in hours, location, characters, props, time of day and the hour when filming should start. Keep breaks in mind and ensure the schedule is realistic. Use 24-hour clock. Do not add any text or information other than the JSON.",
    "As an AI tool, you process a movie script in JSON format to generate an efficient filming schedule. Group scenes with common locations, characters, or props to minimize setup time and maximize filming efficiency. Return a structured JSON output. Filming day contains: day number and scenes. Scenes contain: filming time in hours, location, characters, props, time of day, and start and end time in 24-hour format. Ensure each scene's start time accounts for the time required to film the previous scenes, with no overlaps, and include realistic breaks between scenes.",
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
