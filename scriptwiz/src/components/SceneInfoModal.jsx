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
      <div className={style.sModalContent}>
        <div className={style.sModalHeading}>
          <h2 className={style.sModalH2}>Scene {scene_number} Details</h2>
          <button className={style.sModalCloseButton} onClick={handleClose}>
            Close
          </button>
        </div>

        <div className={style.sModalData}>
          <strong>Filming Date:</strong> {filming_date}
        </div>
        <div className={style.sModalData}>
          <strong>Time:</strong> {exact_start_time} - {exact_end_time}
        </div>
        <div className={style.sModalData}>
          <strong>Duration:</strong> {duration} hours
        </div>
        <div className={style.sModalData}>
          <strong>Place:</strong> {place}
        </div>
        <div className={style.sModalData}>
          <strong>Location:</strong> {location}
        </div>
        <div className={style.sModalData}>
          <strong>Characters:</strong> {characters.join(", ")}
        </div>
        <div className={style.sModalData}>
          <strong>Props:</strong> {props.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SceneInfoModal;
