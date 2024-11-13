import { useEffect, useState } from "react";
import style from "../assets/style";
import CalendarWidget from "../components/CalendarWidget";
import SceneInfoModal from "../components/SceneInfoModal";
import mocData from "../utils/mocdata.json";

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gridData, setGridData] = useState({});
  const [currentDate] = useState(new Date());

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSceneModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Set up the days of the week for the grid
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Populate the grid with scenes from the data
  const populateGrid = () => {
    const filmingDays = mocData.filming_days;
    const newGridData = {};

    filmingDays.forEach((day) => {
      // Calculate the real date by adding (day_number - 1) to the selectedDate
      const sceneDate = new Date(currentDate);
      sceneDate.setDate(sceneDate.getDate() + day.day_number - 1);

      const dayKey = sceneDate.toDateString();

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
          bgColor = "bg-eveningExt text-white";
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
          duration: filming_time_hours,
          start_time,
          end_time,
          filming_time_hours,
          filming_date: sceneDate.toDateString(),
          exact_start_time: start_time,
          exact_end_time: end_time,
          characters,
          props,
          location,
          bgColor,
          place,
        });
      });
    });

    setGridData(newGridData);
  };

  useEffect(() => {
    populateGrid();
    // console.log("Grid Data:", gridData);
  }, [selectedDate]);

  // Get the days of the month for the calendar
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

    // Get the first day of the month and start on Monday
    let currentDay = new Date(startOfMonth);
    currentDay.setDate(currentDay.getDate() - ((currentDay.getDay() + 6) % 7));

    // Get all the days of the month and add the days from the previous and next month to fill the grid
    while (currentDay <= endOfMonth || currentDay.getDay() !== 1) {
      calendarDays.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return calendarDays.map((day) => {
      const isOutsideMonth = day.getMonth() !== selectedDate.getMonth();
      return {
        date: day,
        isOutsideMonth,
      };
    });
  };

  // Get the month name for the heading
  const selectedMonth = selectedDate.toLocaleString("en-US", { month: "long" });

  return (
    <main className={style.sPage}>
      <article className="flex mb-10 w-full">
        <h1 className="">Schedule, {selectedMonth}</h1>
      </article>

      <article className="flex flex-row">
        <section className="border-2 rounded-md grow">
          <div className="grid grid-cols-7 gap-2 text-center h-full p-2 auto-rows-max">
            {days.map((day, index) => (
              <div key={index} className="border-x time-block">
                {day}
              </div>
            ))}

            {getCalendarDays().map(({ date, isOutsideMonth }, index) => {
              const dayKey = date.toDateString();
              return (
                <div
                  key={index}
                  className={`border p-1 relative rounded-sm h-auto min-h-28 ${
                    isOutsideMonth ? "text-gray-400" : ""
                  }`}
                >
                  <div className="text-sm font-bold">{date.getDate()}</div>
                  {gridData[dayKey]?.map((scene, sceneIndex) => (
                    <div
                      key={sceneIndex}
                      className={`rounded-md w-full my-1 p-1 ${scene.bgColor} cursor-pointer`}
                      onClick={() => openSceneModal(scene)}
                    >
                      <div>Scene: {scene.scene_number}</div>
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

      <CalendarWidget onMonthChange={(date) => setSelectedDate(date)} />
    </main>
  );
}

export default SchedulePage;
