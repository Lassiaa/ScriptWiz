import { useEffect, useState } from "react";
import { fetchCharacters } from "../db/firestoreService";
import {useFileContext} from "../contexts/fileContext";

function CharacterBrowsingPage() {
  const [characters, setCharacters] = useState([]);
  const { fileName } = useFileContext();

  const handleFetchCharacters = async () => {
    if (!fileName) {
      alert("Please upload a file to view characters.");
      console.error("Filename is empty. Cannot fetch characters.");
      return;
    }

    const response = await fetchCharacters(fileName, "characters");

    if (response.success) {
      console.log("Fetched characters:", response.data);
      setCharacters(response.data.parsedCharacters);
    } else {
      console.error("Error fetching characters:", response.message);
    }
  };

  // Fetch characters from Firestore once character browsing page is mounted
  useEffect(() => {
    handleFetchCharacters();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-4xl font-bold">List of Characters</h2>

      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Characters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {characters.map((character, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-center">{character.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/4 lg:ml-auto">
          {/* Select dropdown */}
          <select className="border rounded px-2 py-1 w-full">
            <option value="">Select</option>
          </select>

          {/* Filter input */}
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Filter"
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterBrowsingPage;
