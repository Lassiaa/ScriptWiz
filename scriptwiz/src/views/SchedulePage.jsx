import { useEffect, useState } from "react";
import style from "../assets/style";
import { makeApiRequest, roles } from "../utils/openai";
import CalendarWidget from "../components/CalendarWidget";
import mocData from "../utils/mocdata.json";

function SchedulePage() {
  // only for testing
  const [scriptContent, setScriptContent] = useState(null);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    if (localStorage.getItem("script")) {
      setScriptContent(localStorage.getItem("script"));
      // console.log("Script content:", scriptContent);
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
  const [isDay, setIsDay] = useState(true);
  const [gridData, setGridData] = useState({});
  const [sceneDates, setSceneDates] = useState({});

  const setDay = () => setIsDay(true);
  const setNight = () => setIsDay(false);

  const hoursAM = [
    { label: "1.00", id: "1AM" },
    { label: "2.00", id: "2AM" },
    { label: "3.00", id: "3AM" },
    { label: "4.00", id: "4AM" },
    { label: "5.00", id: "5AM" },
    { label: "6.00", id: "6AM" },
    { label: "7.00", id: "7AM" },
    { label: "8.00", id: "8AM" },
    { label: "9.00", id: "9AM" },
    { label: "10.00", id: "10AM" },
    { label: "11.00", id: "11AM" },
    { label: "12.00", id: "noon" },
  ];

  const hoursPM = [
    { label: "13.00", id: "1PM" },
    { label: "14.00", id: "2PM" },
    { label: "15.00", id: "3PM" },
    { label: "16.00", id: "4PM" },
    { label: "17.00", id: "5PM" },
    { label: "18.00", id: "6PM" },
    { label: "19.00", id: "7PM" },
    { label: "20.00", id: "8PM" },
    { label: "21.00", id: "9PM" },
    { label: "22.00", id: "10PM" },
    { label: "23.00", id: "11PM" },
    { label: "0.00", id: "midnight" },
  ];

  const timeBlocks = isDay ? hoursPM : hoursAM;

  const populateGrid = () => {
    const filmingDays = mocData.filming_days;
    const newGridData = {};
    let currentDate = new Date(selectedDate);

    filmingDays.forEach((day) => {
      day.scenes.forEach((scene) => {
        const {
          scene_number,
          start_time,
          end_time,
          filming_time_hours,
          characters,
          props,
        } = scene;

        const startId = timeToId(start_time);
        const endId = timeToId(end_time);
        const duration = filming_time_hours;

        const startIndex = timeBlocks.findIndex(
          (block) => block.id === startId
        );
        const endIndex = timeBlocks.findIndex((block) => block.id === endId);

        console.log(`Processing Scene: ${scene_number}`);
        console.log(`Start ID: ${startId}, End ID: ${endId}`);
        console.log(`Start Index: ${startIndex}, End Index: ${endIndex}`);

        if (startIndex !== -1 && endIndex !== -1) {
          if (!sceneDates[scene_number]) {
            sceneDates[scene_number] = currentDate.toDateString();
          }

          // Adjusting the loop to allow for overlapping scenes
          for (let i = startIndex; i <= endIndex; i++) {
            if (!newGridData[timeBlocks[i].id]) {
              newGridData[timeBlocks[i].id] = [];
            }
            newGridData[timeBlocks[i].id].push({
              scene_number,
              duration,
              characters,
              props,
              location: scene.location,
              filming_date: sceneDates[scene_number],
              exact_start_time: start_time,
              exact_end_time: end_time,
            });
            console.log(`${currentDate} ${timeBlocks[i].id} ${scene_number}`);
          }
        } else {
          console.warn(
            `Invalid time range for scene ${scene_number}: ${startId} to ${endId}`
          );
          console.warn(
            `Check the scene's start_time (${start_time}) and end_time (${end_time})`
          );
        }
      });
      currentDate = getNextWeekday(currentDate);
    });

    setGridData(newGridData);
    setSceneDates(sceneDates);
  };

  // Function to get the next weekday, if it is saturday, skip to monday
  const getNextWeekday = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    if (nextDate.getDay() === 6) {
      nextDate.setDate(nextDate.getDate() + 2);
    }
    return nextDate;
  };

  // Function to convert "HH:mm" format to time block ID like "12AM"
  const timeToId = (timeString) => {
    const [hour] = timeString.split(":").map(Number);
    if (hour === 12) return "noon";
    if (hour === 0) return "midnight";
    if (hour > 12) return `${hour - 12}PM`;
    return `${hour}AM`;
  };

  useEffect(() => {
    populateGrid();
  }, [isDay, selectedDate]);

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

          <div className="grid grid-cols-12 gap-2 text-center min-h-60">
            {timeBlocks
              .filter((hour) => {
                if (isDay && hoursPM.includes(hour)) return true;
                if (!isDay && hoursAM.includes(hour)) return true;
                return false;
              })
              .map((hour) => (
                <div key={hour.id} className="border-x-2 time-block">
                  {hour.label}
                  <div id={hour.id} className="relative h-20">
                    {gridData[hour.id]
                      ?.filter(
                        (scene) =>
                          new Date(scene.filming_date).toDateString() ===
                          selectedDate.toDateString()
                      )
                      .map((scene, index) => (
                        <div
                          key={index}
                          className="scene bg-green-400 mt-2 p-2 rounded-md justify-self-center"
                        >
                          <div className="scene-number">
                            Scene: {scene.scene_number}
                          </div>
                          <div className="exact-times">
                            {scene.exact_start_time} {" - "}
                            {scene.exact_end_time}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

            {/* {timeBlocks.map((hour) => (
              <div key={hour.id} className="border-x-2">
                {hour.label}
                <div id={hour.id}>
                  {gridData[hour.id]
                    ?.filter(
                      (scene) =>
                        new Date(scene.filming_date).toDateString() ===
                        selectedDate.toDateString()
                    )
                    .map((scene, index) => (
                      <div key={index} className="scene ">
                        <div className="scene-number">
                          Scene: {scene.scene_number}
                        </div>
                        <div className="location">{scene.location}</div>
                        {scene.characters.map((char, i) => (
                          <div key={i} className="character">
                            {char}
                          </div>
                        ))}
                        {scene.props.map((prop, i) => (
                          <div key={i} className="prop">
                            {prop}
                          </div>
                        ))}
                        <div className="filming-date">
                          Date: {scene.filming_date}{" "}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))} */}
          </div>
        </section>
      </article>
      <div className="flex w-full place-content-end">
        {!isDay ? (
          <button className="" onClick={setDay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          </button>
        ) : (
          <button className="" onClick={setNight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
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
