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

  scheduleFilters:
    "flex flex-col items-stretch gap-2 w-40 bg-gray-300 rounded-md p-4 mr-4",
  scheduleFiltersHeading: "flex justify-between items-center",
  scheduleFiltersH2: "text-xl font-bold",
  timeLine: "border-b-2 border-gray m-2",
  testbox: "flex flex-col items-center gap-4 mt-10",

  modal:
    "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center",
  modalContent: "bg-white rounded-lg p-4 w-96 h-96 overflow-y-auto",
  calendarModalButton:
    "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2 fixed bottom-6 left-6",
  closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
};

export default style;
