// import style from "../assets/style";
// import json from "../assets/500_DAYS_OF_SUMMER.pdf";
import { fetchCharacters } from "../db/firestoreService";
import { useFileContext } from "../contexts/fileContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Arc from "../components/Arc";

const Overview = () => {
  // Set the number of scenes per act in timeline (hardcoded for now)
  const acts = [3, 2, 3, 3, 4, 3, 2, 3, 4, 3, 2, 3, 3, 4];

  // Highlight the row and column of the hovered item in timeline to better UX
  const [hoveredSceneIndex, setHoveredSceneIndex] = useState(null);
  const [hoveredCharacterIndex, setHoveredCharacterIndex] = useState(null);

  const [scenes, setScenes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [filteredScenes, setFilteredScenes] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  // FOR DEV MOCK DATA TESTING ONLY
  // const fileName = json.scenes;
  // USE THIS WHEN NOT TESTING
  const { fileName } = useFileContext();
  const navigate = useNavigate();

  console.log({ fileName });

  /* FOR DEV TEMPLATE USE (using local files instead from db) */

  /* Get a list of characters from metadata */

  /*
  const getCharacters = () => {
    const rows = json.metadata.split("\n");
    const characters = rows
      .filter((row) => row.trim() !== "") // Filter out empty or whitespace-only rows
      .filter((row) => {
        const characters = row.split(" ")[0]; // Get the first word
        return !characters.includes("("); // Filter out if the first word contains '('
      })
      .map((row) => row.split(" ")[0]);
    return characters;
  };
  const renderCharacters = () => {
    let characters = getCharacters();
    let list = [];
    for (let i = 0; i < characters.length; i++) {
      list.push(<li key={i}>{characters[i]}</li>);
    }
    return list;
  };
  */

  // Fetch characters from Firestore once character browsing page is mounted
  useEffect(() => {
    const fetchData = async () => {
      if (!fileName) {
        setLoading(false); // Stop loading if fileName is null
        return;
      }
      try {
        //USE THIS WHEN TESTING
        const sceneResponse = await fetchCharacters(
          "500_DAYS_OF_SUMMER.pdf.json",
          "scenes"
        );

        const charResponse = await fetchCharacters(
          "500_DAYS_OF_SUMMER.pdf.json",
          "characters"
        );

        if (sceneResponse.success && charResponse.success) {
          console.log("Fetched scenes:", sceneResponse.data.scenes);
          //sort scenes by scene number
          const sortedScenes = sceneResponse.data.scenes.sort(
            (a, b) => a.scene_number - b.scene_number
          );
          setScenes(sortedScenes);
          setFilteredScenes(sortedScenes);

          /* console.log(
            "Fetched characters:",
            charResponse.data.parsedCharacters
          ); */
          setCharacters(charResponse.data.parsedCharacters);
        } else {
          console.error("Error fetching scenes:", sceneResponse.message);
          console.error("Error fetching characters:", charResponse.message);
        }
      } catch (error) {
        console.error("Error during fetching: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Timeline content
  const renderActs = (scenes, characters, scenesPerAct) => {
    let currentSceneIndex = 0;

    // Create a grid for each act and its scenes
    const acts = scenesPerAct.map((numScenes, actIndex) => {
      const startSceneIndex = currentSceneIndex;
      const endSceneIndex = startSceneIndex + numScenes;
      currentSceneIndex = endSceneIndex;

      return (
        <div
          key={actIndex}
          className="grid"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          {/* Sticky header for acts */}
          <div className="h-12 content-center text-center font-bold border-y border-r sticky top-0 bg-white text-black">
            Act {actIndex + 1}
          </div>

          <div className="grid grid-flow-col">
            {scenes
              .slice(startSceneIndex, endSceneIndex)
              .map((scene, index) => {
                const sceneIndex = startSceneIndex + index;
                const isRowHovered = sceneIndex === hoveredSceneIndex;

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center rounded-md w-14 ${
                      isRowHovered ? "bg-secondary/25" : ""
                    }`}
                    onMouseEnter={() => setHoveredSceneIndex(sceneIndex)}
                    onMouseLeave={() => setHoveredSceneIndex(null)}
                  >
                    {/* Sticky header for Scenes within acts */}
                    <p className="h-12 content-center text-center font-semibold border-r border-b w-full sticky top-12 bg-white text-black">
                      S{scene.scene_number}
                    </p>
                    {/* Character Columns */}
                    {characters.map((character, charIndex) => {
                      const isInScene = scene.elements.cast_members.some(
                        (member) => member.name === character.name
                      );
                      const isColHovered = charIndex === hoveredCharacterIndex;

                      return (
                        <p
                          key={charIndex}
                          className={`text-sm h-12 content-center text-center border-r border-b w-full ${
                            isColHovered ? "bg-secondary/25" : ""
                          }`}
                          onMouseEnter={() =>
                            setHoveredCharacterIndex(charIndex)
                          }
                          onMouseLeave={() => setHoveredCharacterIndex(null)}
                        >
                          {isInScene ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="size-6 m-auto"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            "-"
                          )}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      );
    });

    return acts;
  };

  // Get the background color based on the scene type and time of day
  const getBg = (type, timeOfDay) => {
    const colors = {
      EXT: {
        MORNING: "bg-morningExt text-black",
        DAY: "bg-dayExt text-black",
        EVENING: "bg-eveningExt text-black",
        NIGHT: "bg-nightExt text-white",
      },
      INT: {
        MORNING: "bg-morningInt text-black",
        DAY: "bg-dayInt text-black",
        EVENING: "bg-eveningInt text-black",
        NIGHT: "bg-nightInt text-black",
      },
    };

    // Return the appropriate color class
    return colors[type]?.[timeOfDay] || "bg-gray-500"; // Default gray if no match
  };

  if (loading) {
    return <p className="text-center text-2xl py-20">Loading...</p>; // Loading indicator
  }

  // Handle scenes filtering
  const handleFilterScenes = (category, selected) => {
    console.log(category, selected);

    switch (category) {
      case 1:
        setFilteredScenes(
          selected === ""
            ? scenes
            : scenes.filter((scene) => scene.time.includes(selected))
        );
        break;
      case 2:
        setFilteredScenes(
          selected === ""
            ? scenes
            : scenes.filter((scenes) => scenes.set.type.includes(selected))
        );
        break;
      case 3:
        setFilteredScenes(
          selected === ""
            ? scenes
            : scenes.filter((scene) =>
                scene.elements.cast_members.some((member) =>
                  member.name.includes(selected)
                )
              )
        );
        break;
      default:
        break;
    }
    console.log("handle ", scenes);
  };

  // AI API request to generate readability arc
  /*
  let hasArcBeenCreated = false;

 const handleArcCreation = async () => {
    if (hasArcBeenCreated) {
      console.warn("Arc creation already triggered.");
      return;
    }
  
    hasArcBeenCreated = true;

    const jsonString = JSON.stringify(mocData);
    if (jsonString) {
      try {
        const aiPrompt = jsonString;
        const aiRole = roles.arcCreator;
        const aiResult = await makeApiRequest(aiPrompt, aiRole);
        setAiResponse(aiResult);
      } catch (error) {
        console.error("Error generating response:", error);
        setAiResponse({
          error: "Failed to generate response. Please try again later.",
        });
      }
    } else {
      console.warn("No script content available to generate AI response.");
    }
  }; */

  return (
    <main>
      <article className="bg-primary p-10">
        <h1 className="text-3xl font-bold uppercase">Overview</h1>
        <p className="">{fileName}</p>
      </article>

      {/* Timeline content */}
      <article className="px-10 py-10">
        <h2 className="text-2xl pb-10">Timeline</h2>
        <div className="relative h-timeline overflow-y-scroll border-2 border-gray-300 rounded-md">
          <section className="rounded-md flex">
            {/* Timeline headings */}
            <div className="timeline-headings flex flex-col min-w-48 w-48 border-x sticky left-0 z-10 bg-white text-black">
              <p className="min-h-12 h-12 pl-2 content-center font-bold border-y sticky top-0 bg-white">
                Act
              </p>
              <p className="min-h-12 h-12 pl-2 content-center font-bold border-b sticky top-12 bg-white">
                Scene
              </p>
              {characters.map((character, index) => (
                <p
                  key={index}
                  className="min-h-12 h-12 pl-2 content-center font-bold border-b cursor-pointer"
                  onClick={() =>
                    navigate("/character-details", { state: { character } })
                  }
                >
                  {character.name}
                </p>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="overscroll-x-auto flex">
              {renderActs(scenes, characters, acts)}
            </div>
          </section>
        </div>

        {/* Readability arc */}
        <div className="h-64 border-2 border-gray-300 rounded-md">
          <section className="rounded-md flex h-full">
            <div className="flex flex-col h-full min-w-48 w-48 border-x sticky left-0 z-10 bg-white text-black">
              <p className="h-full pl-2 content-center font-bold border-y sticky top-0 bg-white">
                Readability arc
              </p>
            </div>

            <Arc />
          </section>
        </div>
      </article>

      {/* Overview content */}
      <article className="flex flex-col justify-center px-10 pb-28">
        <section>
          {/* <p className="text-3xl pb-10">Scene count: </p>*/}
          <p className="text-3xl pb-10">Filter by: </p>
          <div>
            <p>Time:</p>
            <button
              onClick={() => handleFilterScenes(1, "")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 border-bg-primary border hover:bg-secondary hover:border-black"
            >
              All
            </button>
            <button
              onClick={() => handleFilterScenes(1, "MORNING")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Morning
            </button>
            <button
              onClick={() => handleFilterScenes(1, "DAY")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Day
            </button>
            <button
              onClick={() => handleFilterScenes(1, "EVENING")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Evening
            </button>
            <button
              onClick={() => handleFilterScenes(1, "NIGHT")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Night
            </button>
          </div>
          <div>
            <p>Set type:</p>
            <button
              onClick={() => handleFilterScenes(2, "")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 border-bg-primary border hover:bg-secondary hover:border-black"
            >
              All
            </button>
            <button
              onClick={() => handleFilterScenes(2, "INT")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Interior
            </button>
            <button
              onClick={() => handleFilterScenes(2, "EXT")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Exterior
            </button>
          </div>
          <div>
            <p>Character:</p>
            <button
              onClick={() => handleFilterScenes(3, "")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 border-bg-primary border hover:bg-secondary hover:border-black"
            >
              All
            </button>
            <button
              onClick={() => handleFilterScenes(3, "Tom")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Tom
            </button>
            <button
              onClick={() => handleFilterScenes(3, "Summer")}
              className="uppercase p-2 w-24 font-bold rounded-full duration-300 bg-primary hover:bg-secondary"
            >
              Summer
            </button>
          </div>
        </section>
        <section className="grid">
          <h2 className="text-2xl py-10">Scenes</h2>
          {/* One Scene Content Block */}
          <div className="scenesborder-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredScenes.map((scene, index) => (
              <div key={index} className="bg-white text-blackbg rounded-lg">
                <div className="flex justify-end items-stretch h-24">
                  <div
                    className={`${getBg(scene.set.type[0], scene.time)} 
                      text-2xl grow flex flex-col justify-center pl-4`}
                  >
                    <p className="inline-block align-middle">
                      #{" "}
                      <span className="font-bold text-2xl">
                        {scene.scene_number}
                      </span>
                    </p>
                    <p className="text-base">
                      Page number: {scene.page_number}
                    </p>
                  </div>

                  {/* Get the right colors for the right circumstances */}
                  <div
                    className={`${getBg(
                      scene.set.type[0],
                      scene.time
                    )} p-6 h-full w-20 flex flex-col items-center justify-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="font-bold">{scene.set.type[0]}</p>
                  </div>
                  <div
                    className={`${getBg(
                      scene.set.type[0],
                      scene.time
                    )} p-6 h-full w-20 flex flex-col items-center justify-center`}
                  >
                    {scene.time === "DAY" || scene.time === "MORNING" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8"
                      >
                        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="font-bold">{scene.time}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-5">
                  <p className="normal-case">{scene.synopsis}</p>
                  <p className="normal-case">
                    <span className="font-bold">Location: </span>
                    {scene.location}
                  </p>
                  {scene.elements.cast_members.length > 0 && (
                    <ul>
                      {scene.elements.cast_members.length > 0 && (
                        <span className="font-bold">
                          Characters: ({scene.elements.cast_members.length})
                        </span>
                      )}
                      {scene.elements.cast_members.map(
                        (character, indexCast) => (
                          <li key={indexCast}>
                            {character.name}, {character.age}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                  {scene.elements.supporting_characters.length > 0 && (
                    <ul>
                      {scene.elements.supporting_characters.length > 0 && (
                        <span className="font-bold">
                          Supporting characters:{" "}
                        </span>
                      )}
                      {scene.elements.supporting_characters.map(
                        (character, indexSupport) => (
                          <li key={indexSupport}>{character.name}</li>
                        )
                      )}
                    </ul>
                  )}
                  {scene.elements.notes.length !== 0 && (
                    <p>
                      {scene.elements.notes.length !== 0 && (
                        <span className="font-bold">Notes: </span>
                      )}
                      {scene.elements.notes}
                    </p>
                  )}
                  {scene.elements.intimacy.length !== 0 && (
                    <p>
                      {scene.elements.intimacy.length !== 0 && (
                        <span className="font-bold">Intimacy: </span>
                      )}
                      {scene.elements.intimacy}
                    </p>
                  )}
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default Overview;
