import { useLocation } from "react-router-dom";
import CharacterArc from "../components/CharacterArc";

const CharacterDetailedPage = () => {
  const location = useLocation();
  const { character } = location.state || {};

  if (!character) {
    return <p className="text-center text-2xl py-20">Loading...</p>;
  }

  // console.log("Character:", character);

  return (
    <main className="mainStyling p-10">
      <h1 className="text-center pb-10">{character.name}</h1>
      <article>
        <h2 className="py-6 text-2xl">Character impact in scenes</h2>
        <div className="flex w-full h-96 px-10">
          <CharacterArc characterName={character.name} />
        </div>
      </article>
      {/* Display scenes character is in and their age in the scenes */}
      <article>
        <h2 className="py-6 text-2xl">Scenes</h2>
        <ul className="flex flex-col border rounded-lg p-4">
          {character.ageScenes && character.ageScenes.length > 0 ? (
            character.ageScenes.map((scene, index) => (
              <li className="py-1 flex" key={index}>
                <p className="w-1/4">Scene: {scene.scene}</p>
                <p className="w-3/4"> Age in scene: {scene.age}</p>
              </li>
            ))
          ) : (
            <li>No scenes available</li>
          )}
        </ul>
      </article>
      {/* Display character description */}
      <article>
        <h2 className="py-6 text-2xl">Description</h2>
        <div className="border rounded-lg p-4">Stay tuned!</div>
      </article>
      {/* Display character relationships */}
      <article>
        <h2 className="py-6 text-2xl">Relationships</h2>
        {/* <p>Character relationships...</p> */}
        <div className="border rounded-lg p-4">Stay tuned!</div>
      </article>
    </main>
  );
};

export default CharacterDetailedPage;
