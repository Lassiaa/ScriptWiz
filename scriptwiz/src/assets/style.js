const style = {
  frontPageBody: "w-full flex flex-col justify-center items-center",
  frontPageHeading: "text-3xl font-bold text-center drop-shadow-xl uppercase",
  card: "drop-shadow-xl rounded border-primary border px-12 py-10 m-6 w-96 flex flex-col items-center bg-blackbg",
  fileIcon: "w-24 h-24 mx-auto",
  fileInfo: "my-6",
  fileUpload:
    "bg-blackbg border border-primary text-primary p-2 px-8 rounded-full cursor-pointer font-bold hover:bg-secondary hover:text-white hover:border-secondary duration-300 uppercase",
  overviewTable: "flex flex-col items-stretch gap-5 w-40",
  overviewTableItem: "text-2xl border-2 rounded-md p-2",

  // Schdeule Page
  sPage: "p-10",
  sHeading: "flex mb-10 w-full",
  sH1: "grow",
  sDayButton: "bg-blue-300 w-20 justify-items-center",
  sNightButton: "bg-yellow-300 w-20 justify-items-center",

  sContent: "flex flex-row",
  sContainer: "border-2 rounded-md grow",
  sGrid: "relative grid grid-cols-12 gap-2 text-center h-96 auto-rows-max",
  sHours: "absolute inset-0 grid grid-cols-12 gap-2 pointer-events-none",
  sHour: "border-x-2 time-block h-full",
  sSpace: "h-6 w-full col-span-full",
  sBlock: "rounded-md max-h-fit z-10",
  sProps: "cursor-pointer bg-blue-300 p-1 my-1 rounded-md",
  sPropList: "bg-blue-300 p-2 my-1 rounded-md",
  sChars: "cursor-pointer bg-lime-300 p-1 my-1 rounded-md",
  sCharList: "bg-lime-300 p-2 my-1 rounded-md",

  // Schedule Modal
  sModal:
    "fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 text-black",
  sModalContent: "bg-white p-5 rounded-md shadow-lg w-1/2",
  sModalHeading: "flex w-full mb-3 text-black",
  sModalH2: "text-2xl grow self-center",
  sModalCloseButton: "uppercase text-white bg-primary hover:bg-secondary duration-300 rounded-full size-7",
  sModalData: "mb-3",

  // Calendar widget
  modal:
    "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 text-black",
  modalContent: "bg-white rounded-lg p-4 w-96 h-96 overflow-y-auto",
  calendarModalButton:
    "bg-primary uppercase text-white font-bold py-2 px-8 rounded-full hover:bg-secondary flex items-center gap-2 fixed bottom-6 left-6 duration-300",
  closeButton: "absolute top-3 right-3 text-white rounded-full py-2 px-8 bg-primary uppercase hover:bg-secondary duration-300 font-bold",
};

export default style;
