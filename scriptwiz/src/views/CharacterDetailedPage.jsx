import { useLocation } from "react-router-dom";

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
      {/* Display character description */}
      <article>
        <h2 className="py-6 text-2xl">Description</h2>
        <p>About character...</p>
      </article>
      {/* Display scenes character is in and their age in the scenes */}
      <article>
        <h2 className="py-6 text-2xl">Scenes</h2>
        <ul className="flex flex-col">
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
      {/* Display character relationships */}
      <article>
        <h2 className="py-6 text-2xl">Relationships</h2>
        <p>Character relationships...</p>
      </article>
    </main>
  );
};

export default CharacterDetailedPage;
