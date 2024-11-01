import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";

import FrontPage from "./views/FrontPage";
import NavBar from "./components/NavBar";
import CharacterBrowsingPage from "./views/CharacterBrowsingPage";
import Overview from "./views/Overview";
import SchedulePage from "./views/SchedulePage";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/characters" element={<CharacterBrowsingPage />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </HashRouter>      
      
  );
}

export default App;
