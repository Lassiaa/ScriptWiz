import style from "../assets/style";

const SceneInfoModal = ({ show, handleClose, sceneInfo }) => {
  if (!show || !sceneInfo) return null;

  const {
    scene_number,
    duration,
    characters,
    props,
    location,
    place,
    filming_date,
    exact_start_time,
    exact_end_time,
  } = sceneInfo;

  return (
    <div className={style.sModal}>
      <div className="bg-white p-5 rounded-md shadow-lg w-1/2">
        <div className="flex w-full mb-3">
          <h2 className="text-2xl grow self-center">
            Scene {scene_number} Details
          </h2>
          <button
            className={"text-gray-500 hover:text-gray-700 rounded-md"}
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="mb-3">
          <strong>Filming Date:</strong> {filming_date}
        </div>
        <div className="mb-3">
          <strong>Time:</strong> {exact_start_time} - {exact_end_time}
        </div>
        <div className="mb-3">
          <strong>Duration:</strong> {duration} hours
        </div>
        <div className="mb-3">
          <strong>Place:</strong> {place}
        </div>
        <div className="mb-3">
          <strong>Location:</strong> {location}
        </div>
        <div className="mb-3">
          <strong>Characters:</strong> {characters.join(", ")}
        </div>
        <div className="mb-3">
          <strong>Props:</strong> {props.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SceneInfoModal;
