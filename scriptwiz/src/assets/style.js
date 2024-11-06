const style = {
  frontPageBody: "bg-gray-200 h-screen flex flex-col items-center",
  frontPageHeading: "text-4xl font-bold text-center my-10",
  card: "bg-white rounded px-12 py-10 m-6 w-96 flex flex-col items-center",
  fileIcon: "w-24 h-24 mx-auto",
  fileInfo: "my-6",
  fileUpload:
    "bg-blue-500 text-white p-2 px-4 rounded cursor-pointer hover:bg-blue-600",
  overviewTable: "flex flex-col items-stretch gap-5 w-40",
  overviewTableItem: "text-2xl border-2 rounded-md p-2",

  schedulePage: "p-10",
  scheduleHeading: "flex mb-10 w-full",
  scheduleH1: "grow",
  scheduleDayButton: "bg-blue-300 w-20 justify-items-center",
  scheduleNightButton: "bg-yellow-300 w-20 justify-items-center",

  scheduleContent: "flex flex-row",
  scheduleContainer: "border-2 rounded-md grow",
  scheduleGrid:
    "relative grid grid-cols-12 gap-2 text-center h-96 auto-rows-max",
  scheduleHours: "absolute inset-0 grid grid-cols-12 gap-2 pointer-events-none",
  scheduleHour: "border-x-2 time-block h-full",
  scheduleSpace: "h-6 w-full col-span-full",
  scheduleBlock: "rounded-md max-h-fit z-10",
  scheduleProps: "cursor-pointer bg-blue-300 p-1 my-1 rounded-md",
  schedulePropList: "bg-blue-300 p-2 my-1 rounded-md",
  scheduleChars: "cursor-pointer bg-lime-300 p-1 my-1 rounded-md",
  scheduleCharList: "bg-lime-300 p-2 my-1 rounded-md",

  modal:
    "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20",
  modalContent: "bg-white rounded-lg p-4 w-96 h-96 overflow-y-auto",
  calendarModalButton:
    "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2 fixed bottom-6 left-6",
  closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
};

export default style;
