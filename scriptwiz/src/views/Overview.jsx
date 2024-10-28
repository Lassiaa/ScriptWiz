// import style from "../assets/style";
import json from "../assets/500_DAYS_OF_SUMMER.pdf";
import { fetchCharacters } from "../db/firestoreService";
import { useFileContext } from "../contexts/fileContext";
import { useEffect, useState } from "react";

const Overview = () => {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  // FOR DEV MOCK DATA TESTING ONLY
  // const fileName = json.scenes;
  // USE THIS WHEN NOT TESTING
  const { fileName } = useFileContext();
  console.log(fileName);
  console.log('test');

  {
    /* FOR DEV TEMPLATE USE (using local files instead from db) */
  }
  {
    /* Get a list of characters from metadata */
  }
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
            const response = await fetchCharacters("500_DAYS_OF_SUMMER.pdf.json", "scenes");

            if (response.success) {
                console.log("Fetched scenes:", response.data.scenes);
                setScenes(response.data.scenes);
            } else {
                console.error("Error fetching characters:", response.message);
            }
        } catch (error) {
            console.error("Error during fetching: ", error)
        } finally {
            setLoading(false)
        }
    };

    fetchData();
    
  }, [fileName]);


  if (loading) {
    return <div>Loading...</div>; // Loading indicator
    }

  return (
    <main className="mainStyling p-10">
      <article>
        <h1 className="pb-10">Overview</h1>
      </article>
      <article className="flex flex-col justify-center">
        <section>
          <p className="text-3xl pb-10">Scene count: </p>
          <p className="text-3xl pb-10">Filter by: </p>
        </section>
        <section className="grid">
          <p className="text-3xl pb-10 text-center">Scenes</p>
          {/* One Scene Content Block */}
          <div className="scenesborder-gray-300 place-self-center md:w-[500px] gap-10">
            {fileName === null
            ? ('something went wrong sorry :(')
            : (
            scenes.map((scene, index) => (
              <div key={index} className="">
                <div className="flex justify-end items-stretch h-24">
                  <div className="border-y border-gray-300  text-2xl text-center grow flex flex-col items-center justify-center">
                    <p className="inline-block align-middle">SCENE # <span className="font-bold text-3xl">{scene.scene_number}</span></p>
                    <p className="text-base">Page number: {scene.page_number}</p>
                  </div>
                    {scene.set.type[0] === "EXT" ? (
                    <div className="bg-green-500 p-6 h-full w-20 flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                      </svg>
                      <p className="font-bold">EXT</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-500 p-6 h-full w-20 flex flex-col items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                      </svg>
                      <p className="font-bold">INT</p>
                    </div>
                  )}
                    <div className="bg-black rounded-r-md">
                    {scene.time === "DAY" ? (
                      <div className="bg-yellow-300 p-6 h-full w-20 flex flex-col items-center justify-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8"
                        >
                            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                        </svg>
                        <p className="font-bold">DAY</p>
                      </div>
                    ) : (
                      <div className="bg-blue-300 p-6 h-full w-20 flex flex-col items-center justify-center">
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
                        <p className="font-bold">NIGHT</p>
                      </div>
                    )}
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
                          {scene.elements.cast_members.length > 0
                          && (<span className="font-bold">Characters: ({scene.elements.cast_members.length})</span>)
                          }
                          {scene.elements.cast_members.map((character, indexCast) => (<li key={indexCast}>{character.name}, {character.age}</li>))}
                      </ul>
                    )}
                    {scene.elements.supporting_characters.length > 0 && (
                      <ul>
                          {scene.elements.supporting_characters.length > 0
                          && (<span className="font-bold">Supporting characters: </span>)
                          }
                          {scene.elements.supporting_characters.map((character, indexSupport) => (<li key={indexSupport}>{character.name}</li>))}
                      </ul>
                    )}
                    {scene.elements.notes.length !== 0 && (
                      <p>
                          {scene.elements.notes.length !== 0 && (<span className="font-bold">Notes: </span>)}
                          {scene.elements.notes}
                      </p>
                    )}
                    {scene.elements.intimacy.length !== 0 && (
                      <p>
                          {scene.elements.intimacy.length !== 0 && (<span className="font-bold">Intimacy: </span>)}
                          {scene.elements.intimacy}
                      </p>
                    )}
                    <p>
                      
                    </p>
                </div>
              </div>
            ))
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default Overview;
