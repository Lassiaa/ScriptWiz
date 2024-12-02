import { useEffect, useState } from "react";
import style from "../assets/style";
import SceneInfoModal from "../components/SceneInfoModal";
import mocData from "../utils/scheduleMockdata.json";

import Weather from "../components/Weather";
import { useFileContext } from "../contexts/fileContext";

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gridData, setGridData] = useState({});
  const [currentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedScene, setSelectedScene] = useState(null);
  const { fileName } = useFileContext();
  const filmingDates = [];

  // Data for the weather API
  const [cityInput, setCityInput] = useState("");
  const { city, weatherData, fetchWeatherData } = Weather();

  // Get the month and year names for the heading
  const selectedMonth = selectedDate.toLocaleString("en-US", { month: "long" });
  const selectedYear = selectedDate.getFullYear();

  const openSceneModal = (scene) => {
    setSelectedScene(scene);
    setShowModal(true);
  };

  const closeSceneModal = () => {
    setShowModal(false);
    setSelectedScene(null);
  };

  // Close modal on escape key press to improve UX
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

      filmingDates.push(dayKey);

      // Loop through each scene in the day
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

        // Check if the day key exists in the grid data
        if (!newGridData[dayKey]) {
          newGridData[dayKey] = [];
        }

        // Set background color based on time of day and place
        let bgColor;
        if (time_of_day === "MORNING" && place === "INT")
          bgColor = "bg-morningInt text-black";
        else if (time_of_day === "MORNING" && place === "EXT")
          bgColor = "bg-morningExt text-black";
        else if (time_of_day === "EVENING" && place === "INT")
          bgColor = "bg-eveningInt text-black";
        else if (time_of_day === "EVENING" && place === "EXT")
          bgColor = "bg-eveningExt text-white";
        else if (time_of_day === "DAY" && place === "INT")
          bgColor = "bg-dayInt text-black";
        else if (time_of_day === "DAY" && place === "EXT")
          bgColor = "bg-dayExt text-black";
        else if (time_of_day === "NIGHT" && place === "INT")
          bgColor = "bg-nightInt text-white";
        else if (time_of_day === "NIGHT" && place === "EXT")
          bgColor = "bg-nightExt text-white";

        // Add scene data to the grid
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

  // Change the month when the user clicks the navigation buttons
  const handleMonthChange = (direction) => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + direction,
        1
      )
    );
  };

  return (
    <main className="">
      <article className="bg-primary p-10">
        <h1 className="text-3xl font-bold uppercase">
          Schedule
        </h1>
        <p className="">
          {fileName}
        </p>
      </article>

      {/* Input section for weather data */}
      <article className="px-10 py-6">
        <h2 className="text-2xl font-bold">Filming location: {city}</h2>
        <p className="text-gray-300">Insert your filming location for weather data</p>
        <input
          type="text"
          placeholder="Helsinki"
          className="p-2 mt-2 mr-2 rounded-md text-black"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button
          className="w-20 bg-primary p-2 rounded-full uppercase font-bold hover:bg-secondary duration-300 ease-in-out"
          onClick={() => fetchWeatherData(cityInput)}
        >
          Set
        </button>  
      </article>

      {/* Navigation buttons for calendar */}
      <article>
        <section className="px-10 flex justify-center gap-10 pb-5">
          <button
            className="uppercase bg-primary p-2 rounded-full hover:bg-secondary duration-300 ease-in-out"
            onClick={() => handleMonthChange(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="uppercase font-bold text-xl self-center justify-self-center">{selectedMonth}, {selectedYear}</div>
          <button
            className="uppercase place-self-end bg-primary p-2 rounded-full hover:bg-secondary duration-300 ease-in-out"
            onClick={() => handleMonthChange(1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </section>
      </article>

      {/* Schedule grid */}
      <article className={`flex flex-row ${style.sPage}`}>
        <section className="border-2 rounded-md grow">
          <div className="grid grid-cols-7 gap-2 text-center h-full p-2 auto-rows-max">
            {days.map((day, index) => (
              <div key={index} className="border-x time-block">
                {day}
              </div>
            ))}

            {/* Get calendar days for the grid */}
            {getCalendarDays().map(({ date, isOutsideMonth }, index) => {
              const dayKey = date.toDateString();

              return (
                <div
                  key={index}
                  className={`border p-1 relative rounded-sm h-auto min-h-28 ${
                    isOutsideMonth ? "text-gray-400" : ""
                  }`}
                >
                  <div className="text-sm font-bold flex justify-center gap-1">
                    {date.getDate()}
                    
                    {/* sum the day's schooting duration */}
                    {gridData[dayKey]?.reduce((sum, scene) => sum + scene.duration, 0) > 0 && (
                        <div className="font-normal">
                          ({gridData[dayKey].reduce((sum, scene) => sum + scene.duration, 0)}h)
                        </div>
                    )} 
                  </div>

                  {/* Display weather data for the day */}
                  {weatherData[dayKey] && (
                    <div className="weather-info text-sm">
                      <p>{weatherData[dayKey].weather?.description}</p>
                      <p>{weatherData[dayKey].temp}°C</p>
                    </div>
                  )}

                  {/* render day's shooting scene */}       
                  {gridData[dayKey]?.map((scene, sceneIndex) => (
                    <div
                      key={sceneIndex}
                      className={`rounded-md w-full my-1 ${scene.bgColor} cursor-pointer text-left`}
                      onClick={() => openSceneModal(scene)}
                    >
                      <div>
                        <div className="px-1 border-b-2 border-blackbg">
                          {scene.exact_start_time} - {scene.exact_end_time} ({scene.duration}h)
                        </div>
                        <div className="px-1 border-b-2 border-blackbg">
                          <span className="font-bold">{scene.scene_number}:</span> {scene.location}, {scene.place}
                        </div>
                        <div className="px-1">
                          {scene.characters.map((character, index) => (
                            <div key={index}>{character}</div>
                          ))}
                        </div>
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
    </main>
  );
}

export default SchedulePage;
