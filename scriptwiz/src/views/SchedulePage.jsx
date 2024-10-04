import { useEffect, useState } from "react";
import style from "../assets/style";
import { makeApiRequest, roles } from "../utils/openai";
import CalendarWidget from "../components/CalendarWidget";

function SchedulePage() {
  // only for testing
  const [scriptContent, setScriptContent] = useState(null);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    if (localStorage.getItem("script")) {
      setScriptContent(localStorage.getItem("script"));
      console.log("Script content:", scriptContent);
    }
  }, []);

  const handleTestClick = async () => {
    if (scriptContent) {
      try {
        const aiPrompt = scriptContent;
        const aiRole = roles.scheduler;
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

  // testi loppuu

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main className="mainStyling p-10">
      <article>
        <h1 className="pb-10">Schedule, {selectedDate.toDateString()}</h1>
      </article>
      <article className="flex flex-row">
        <section className={style.scheduleFilters}>
          <div className={style.scheduleFiltersHeading}>
            <h2 className={style.scheduleFiltersH2}>Filters</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
          <ul>
            <li>Characters</li>
            <li>Scenes</li>
            <li>Props</li>
          </ul>
        </section>
        <section className=" border-2 rounded-md grow">
          <div className={style.timeLine}></div>
          <div className="">
            <ul className="list-none flex flex-wrap flex-row content-around items-stretch">
              <li></li>
            </ul>
          </div>
        </section>
      </article>
      <div className={style.testbox}>
        <button onClick={handleTestClick}>Test AI</button>
        <h2>AI Response:</h2>
        <p>{aiResponse}</p>
      </div>

      <CalendarWidget onDateChange={setSelectedDate} />
    </main>
  );
}

export default SchedulePage;
