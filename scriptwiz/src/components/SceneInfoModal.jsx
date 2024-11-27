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
          <svg fill="none" viewBox="0 0 24 24" height="1.75em" width="1.75em" {...props}>
      <path
        fill="currentColor"
        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
      />
    </svg>
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
