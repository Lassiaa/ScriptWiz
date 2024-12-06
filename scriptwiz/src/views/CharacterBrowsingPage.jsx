import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacters } from "../db/firestoreService";
import { useFileContext } from "../contexts/fileContext";
import CharacterImportanceArc from "../components/CharacterImportanceArc";

function CharacterBrowsingPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const { fileName } = useFileContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch characters from Firestore using the uploaded file
  const handleFetchCharacters = async () => {
    if (!fileName) {
      console.error("Filename is empty. Cannot fetch characters.");
      navigate("/");
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

  // Function to send character data to CharacterDetailedPage
  const sendCharacterData = (character) => {
    navigate("/character-details", { state: { character } });
  };

  // Function to handle search input change for filtering characters
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="">
      <article className="bg-primary p-10">
        <h1 className="text-3xl font-bold uppercase">Characters</h1>
        <p className="">{fileName}</p>
      </article>

      <article>
        <h2 className="text-2xl font-bold p-10">Character Importance</h2>
        <div className="flex w-full h-96 px-10">
          <CharacterImportanceArc />
        </div>
      </article>

      <h2 className="text-2xl font-bold p-10">Character List</h2>

      <article className="p-10 flex flex-col-reverse lg:flex-row gap-4">
        {/* Characters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {filteredCharacters.map((character, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => sendCharacterData(character)}
            >
              <p className="text-center">{character.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/4 lg:ml-auto">
          {/* Filter input for searching for characters */}
          <h2 className="text-xl">Filter</h2>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-black"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Select dropdown */}
          <select className="border rounded px-2 py-1 w-full">
            <option value="">Select</option>
          </select>
        </div>
      </article>
    </main>
  );
}

export default CharacterBrowsingPage;
