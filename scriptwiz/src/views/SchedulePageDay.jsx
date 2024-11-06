import { useEffect, useState } from "react";
import style from "../assets/style";
import CalendarWidgetDay from "../components/CalendarWidgetDay";
import SceneInfoModal from "../components/SceneInfoModal";
import mocData from "../utils/mocdata.json";

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDay, setIsDay] = useState(true);
  const [gridData, setGridData] = useState({});
  const [sceneDates, setSceneDates] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedScene, setSelectedScene] = useState(null);

  const [isPropsVisible, setIsPropsVisible] = useState(false);
  const [isCharVisible, setIsCharVisible] = useState(false);

  const openSceneModal = (scene) => {
    setSelectedScene(scene);
    setShowModal(true);
  };

  const closeSceneModal = () => {
    setShowModal(false);
    setSelectedScene(null);
  };

  const setDay = () => setIsDay(true);
  const setNight = () => setIsDay(false);

  // labels for the time blocks in the grid based on 24-hour format
  const hoursAM = [
    { label: "18.00", id: "6PM" },
    { label: "19.00", id: "7PM" },
    { label: "20.00", id: "8PM" },
    { label: "21.00", id: "9PM" },
    { label: "22.00", id: "10PM" },
    { label: "23.00", id: "11PM" },
    { label: "0.00", id: "midnight" },
    { label: "1.00", id: "1AM" },
    { label: "2.00", id: "2AM" },
    { label: "3.00", id: "3AM" },
    { label: "4.00", id: "4AM" },
    { label: "5.00", id: "5AM" },
  ];

  const hoursPM = [
    { label: "6.00", id: "6AM" },
    { label: "7.00", id: "7AM" },
    { label: "8.00", id: "8AM" },
    { label: "9.00", id: "9AM" },
    { label: "10.00", id: "10AM" },
    { label: "11.00", id: "11AM" },
    { label: "12.00", id: "noon" },
    { label: "13.00", id: "1PM" },
    { label: "14.00", id: "2PM" },
    { label: "15.00", id: "3PM" },
    { label: "16.00", id: "4PM" },
    { label: "17.00", id: "5PM" },
  ];

  // time blocks for the grid based on night or day
  const timeBlocks = isDay ? hoursPM : hoursAM;

  // Function to populate the grid with visual blocks of scenes based on the selected date
  const populateGrid = () => {
    const filmingDays = mocData.filming_days;
    const newGridData = {};
    let currentDate = new Date(selectedDate);

    // Loop through each scene and add it to the grid
    filmingDays.forEach((day) => {
      day.scenes.forEach((scene) => {
        const {
          scene_number,
          start_time,
          end_time,
          filming_time_hours,
          characters,
          props,
          place,
        } = scene;

        const startId = timeToId(start_time);
        const endId = timeToId(end_time);

        // Check if the scene is on the selected date
        const startIndex = timeBlocks.findIndex(
          (block) => block.id === startId
        );
        const endIndex = timeBlocks.findIndex((block) => block.id === endId);

        if (startIndex !== -1 && endIndex !== -1) {
          if (!sceneDates[scene_number]) {
            sceneDates[scene_number] = currentDate.toDateString();
          }

          // Calculate the number of columns the scene block should span
          const columnSpan = endIndex - startIndex;

          // Set the background color based on the time of day and place
          let bgColor;
          const timeOfDay = scene.time_of_day;

          if (timeOfDay === "MORNING" && place === "INT")
            bgColor = "bg-morningInt";
          else if (timeOfDay === "MORNING" && place === "EXT")
            bgColor = "bg-morningExt";
          else if (timeOfDay === "EVENING" && place === "INT")
            bgColor = "bg-eveningInt";
          else if (timeOfDay === "EVENING" && place === "EXT")
            bgColor = "bg-eveningExt text-white";
          else if (timeOfDay === "DAY" && place === "INT")
            bgColor = "bg-dayInt";
          else if (timeOfDay === "DAY" && place === "EXT")
            bgColor = "bg-dayExt";
          else if (timeOfDay === "NIGHT" && place === "INT")
            bgColor = "bg-nightInt text-white";
          else if (timeOfDay === "NIGHT" && place === "EXT")
            bgColor = "bg-nightExt text-white";

          // Data for the scene block
          const sceneBlock = {
            scene_number,
            duration: filming_time_hours,
            characters,
            props,
            location: scene.location,
            filming_date: sceneDates[scene_number],
            exact_start_time: start_time,
            exact_end_time: end_time,
            columnSpan,
            bgColor,
            place,
          };

          if (!newGridData[startId]) {
            newGridData[startId] = [];
          }
          newGridData[startId].push(sceneBlock);
        }
      });
      currentDate = getNextWeekday(currentDate);
    });

    // Update the grid data and scene dates
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
    <main className={style.sPage}>
      <article className={style.sHeading}>
        <h1 className={style.sH1}>Schedule, {selectedDate.toDateString()}</h1>

        {!isDay ? (
          <button className={style.sDayButton} onClick={setDay}>
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
        ) : (
          <button className={style.sNightButton} onClick={setNight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          </button>
        )}
      </article>

      <article className={style.sContent}>
        <section className={style.sContainer}>
          <div className={style.sGrid}>
            <div className={style.sHours}>
              {timeBlocks.map((hour) => (
                <div key={hour.id} className={style.sHour}>
                  {hour.label}
                </div>
              ))}
            </div>
            <div className={style.sSpace}></div>

            {/* Loop through the grid data and render the scene blocks */}
            {Object.entries(gridData).flatMap(([startId, scenes]) =>
              scenes
                .filter(
                  (scene) =>
                    new Date(scene.filming_date).toDateString() ===
                    selectedDate.toDateString()
                )
                .map((scene, index) => {
                  const startIndex = timeBlocks.findIndex(
                    (block) => block.id === startId
                  );
                  const gridColumnStart = startIndex + 1;
                  return (
                    <div
                      key={`${scene.scene_number}-${index}`}
                      style={{
                        gridColumn: `${gridColumnStart} / span ${scene.columnSpan}`,
                      }}
                      className={style.sBlock}
                    >
                      <div
                        onClick={() => setIsPropsVisible(!isPropsVisible)}
                        className={style.sProps}
                      >
                        Props
                      </div>
                      {isPropsVisible && (
                        <div className={style.sPropList}>
                          {scene.props.map((prop, index) => (
                            <div key={index}>{prop}</div>
                          ))}
                        </div>
                      )}

                      <button
                        className={`w-full ${scene.bgColor}`}
                        onClick={() => openSceneModal(scene)}
                      >
                        <div>Scene: {scene.scene_number}</div>
                        <div>
                          {scene.exact_start_time} {" - "}{" "}
                          {scene.exact_end_time}
                        </div>
                      </button>

                      <div
                        onClick={() => setIsCharVisible(!isCharVisible)}
                        className={style.sChars}
                      >
                        Characters
                      </div>
                      {isCharVisible && (
                        <div className={style.sCharList}>
                          {scene.characters.map((character, index) => (
                            <div key={index}>{character}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
            )}
          </div>
        </section>
      </article>

      <SceneInfoModal
        show={showModal}
        handleClose={closeSceneModal}
        sceneInfo={selectedScene}
      />

      <CalendarWidgetDay onDateChange={setSelectedDate} />
    </main>
  );
}

export default SchedulePage;
