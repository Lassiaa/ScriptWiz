import style from "../assets/style";
import json from "../assets/the_addams_family_short.txt-2.json";
import { fetchCharacters } from "../db/firestoreService";
import { useFileContext } from "../contexts/fileContext";
import { useEffect, useState } from "react";

const Overview = () => {
  const [characters, setCharacters] = useState([]);
  const [scenes, setScenes] = useState();
  const { fileName } = useFileContext();

  {
    /* FOR DEV TEMPLATE USE (using local files instead from db) */
  }
  {
    /* Get a list of characters from metadata */
  }
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

  const handleFetchCharacters = async () => {
    /*
        if (!fileName) {
          alert("Please upload a file to view characters.");
          console.error("Filename is empty. Cannot fetch characters.");
          return;
        }*/

    const response = await fetchCharacters(fileName);

    if (response.success) {
      console.log("Fetched characters:", response.data);
      setCharacters(response.data.parsedCharacters);
    } else {
      console.error("Error fetching characters:", response.message);
    }
  };

  const handleFetchScenes = async () => {
    const response = await fetchCharacters(fileName, "scenes");

    if (response.success) {
      // console.log("Fetched scenes:", response.data.scenes);
      setScenes(response.data.scenes);
    } else {
      console.error("Error fetching characters:", response.message);
    }
  };

  // Fetch characters from Firestore once character browsing page is mounted
  useEffect(() => {
    //handleFetchCharacters();
    handleFetchScenes();
  }, []);

  return (
    <main className="mainStyling p-10">
      <article>
        <h1 className="pb-10">Overview</h1>
      </article>
      <article className="flex flex-row justify-center">
        <section className="flex flex-col justify-center items-stretch w-80">
          <p className="text-3xl pb-10 text-center">Scene</p>
          {/* One Scene Content Block */}
          <div className="scenes border-l-4 border-gray-300 flex flex-col gap-10">
            {scenes.map((scene, index) => (
              <div key={index} className="">
                <div className="flex justify-end items-center gap-5">
                {scene.set.type[0] === "EXT" ? (
                  <p className="border-y-2 border-r-2 border-gray-300 rounded-r-md text-2xl text-center p-4 bg-white grow">
                    {scene.scene_number}
                  </p>
                ) : (
                  <p className="border-y-2 border-r-2 border-gray-300 rounded-r-md text-2xl text-center p-4 bg-gray-300 grow">
                    {scene.scene_number}
                  </p>
                )}
                {scene.time === "DAY" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                </div>
                <div className="p-4">
                    <p className="normal-case">{scene.synopsis}</p>
                    <p className="normal-case">
                        <span className="font-bold">Location: </span>
                        {scene.location}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Table Title */}
        {/*
            <section className={style.overviewTable}>
                <p className={style.overviewTableItem}>Act</p>
                <p className={style.overviewTableItem}>Scene</p>
                <ul className={`list-none characterList flex flex-col gap-3 ${style.overviewTableItem}`}>
                    {/* renderCharacters() */}
        {/* characters.map((character, index) => (
                        <li key ={index} className="">{character.name}</li>
                    ))*/}
        {/*
                </ul>
                <p className={style.overviewTableItem}>Intensity</p>
            </section>
            */}
        {/* Table Content */}
        {/*
            <section className=" border-2 rounded-md grow">
                <div className="" id="scenes">
                    <ul className="list-none flex flex-wrap flex-row content-around items-stretch">
                    
                    </ul>
                </div>
            </section>
            */}
      </article>
    </main>
  );
};

export default Overview;
