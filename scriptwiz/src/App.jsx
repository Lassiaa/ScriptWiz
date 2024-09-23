import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FrontPage from "./views/FrontPage";
import NavBar from "./components/NavBar";
import CharacterBrowsingPage from "./views/CharacterBrowsingPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/characters" element={<CharacterBrowsingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
