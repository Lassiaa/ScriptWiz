import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import style from "../assets/style";
import "../assets/calendar.css";

function CalendarWidget({ onMonthChange }) {
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleMonthChange = ({ activeStartDate }) => {
    const monthStartDate = new Date(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth(),
      1
    );
    setValue(monthStartDate);
    onMonthChange(monthStartDate);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button
        className={style.calendarModalButton}
        onClick={() => setIsOpen(true)}
      >
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        Calendar
      </button>

      {isOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <button
              className={style.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <svg fill="none" viewBox="0 0 24 24" height="1.75em" width="1.75em">
                <path
                  fill="currentColor"
                  d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                />
              </svg>
            </button>
            <Calendar
              className={`flex flex-col h-full justify-center`}
              onActiveStartDateChange={handleMonthChange}
              value={value}
              view="year"
            />
            <div className="fixed bg-black bg-opacity-50 -z-10 w-full h-full top-0 left-0" onClick={() => setIsOpen(false)}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWidget;
