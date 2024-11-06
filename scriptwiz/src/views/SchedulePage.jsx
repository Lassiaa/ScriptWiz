import { useEffect, useState } from "react";
import style from "../assets/style";
import CalendarWidget from "../components/CalendarWidget";
import SceneInfoModal from "../components/SceneInfoModal";
import mocData from "../utils/mocdata.json";

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gridData, setGridData] = useState({});
  const [sceneDates, setSceneDates] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedScene, setSelectedScene] = useState(null);

  const openSceneModal = (scene) => {
    setSelectedScene(scene);
    setShowModal(true);
  };

  const closeSceneModal = () => {
    setShowModal(false);
    setSelectedScene(null);
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const populateGrid = () => {
    const filmingDays = mocData.filming_days;
    const newGridData = {};

    filmingDays.forEach((day) => {
      day.scenes.forEach((scene) => {
        const {
          scene_number,
          start_time,
          end_time,
          filming_time_hours,
          characters,
          props,
          location,
          time_of_day,
          place,
        } = scene;

        const sceneDate = new Date(day.date);
        const dayKey = sceneDate.toDateString();

        if (!newGridData[dayKey]) {
          newGridData[dayKey] = [];
        }

        let bgColor;
        if (time_of_day === "MORNING" && place === "INT")
          bgColor = "bg-morningInt";
        else if (time_of_day === "MORNING" && place === "EXT")
          bgColor = "bg-morningExt";
        else if (time_of_day === "EVENING" && place === "INT")
          bgColor = "bg-eveningInt";
        else if (time_of_day === "EVENING" && place === "EXT")
          bgColor = "bg-eveningExt  text-white";
        else if (time_of_day === "DAY" && place === "INT")
          bgColor = "bg-dayInt";
        else if (time_of_day === "DAY" && place === "EXT")
          bgColor = "bg-dayExt";
        else if (time_of_day === "NIGHT" && place === "INT")
          bgColor = "bg-nightInt text-white";
        else if (time_of_day === "NIGHT" && place === "EXT")
          bgColor = "bg-nightExt text-white";

        newGridData[dayKey].push({
          scene_number,
          start_time,
          end_time,
          filming_time_hours,
          characters,
          props,
          location,
          bgColor,
        });
      });
    });

    setGridData(newGridData);
  };

  useEffect(() => {
    populateGrid();
  }, [selectedDate]);

  const getCalendarDays = () => {
    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    const calendarDays = [];

    let currentDay = new Date(startOfMonth);
    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1);

    while (currentDay <= endOfMonth || currentDay.getDay() !== 1) {
      calendarDays.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return calendarDays;
  };

  return (
    <main className={style.schedulePage}>
      <article className="flex mb-10 w-full">
        <h1 className="">Schedule, {selectedDate.toDateString()}</h1>
      </article>

      <article className="flex flex-row">
        <section className="border-2 rounded-md grow">
          <div className="grid grid-cols-7 gap-2 text-center h-full p-2 auto-rows-max">
            {days.map((day, index) => (
              <div key={index} className="border-x time-block">
                {day}
              </div>
            ))}

            {getCalendarDays().map((day, index) => {
              const dayKey = day.toDateString();
              return (
                <div
                  key={index}
                  className="border p-1 relative rounded-sm h-28"
                >
                  <div className="text-sm font-bold">{day.getDate()}</div>
                  {gridData[dayKey]?.map((scene, sceneIndex) => (
                    <div
                      key={sceneIndex}
                      className={`rounded-md my-1 p-1 ${scene.bgColor}`}
                      onClick={() => openSceneModal(scene)}
                    >
                      <div>Scene: {scene.scene_number}</div>
                      <div>
                        {scene.start_time} - {scene.end_time}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <SceneInfoModal
        show={showModal}
        handleClose={closeSceneModal}
        sceneInfo={selectedScene}
      />

      <CalendarWidget onDateChange={setSelectedDate} />
    </main>
  );
}

export default SchedulePage;
