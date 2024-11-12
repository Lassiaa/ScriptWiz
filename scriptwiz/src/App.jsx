import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";

import FrontPage from "./views/FrontPage";
import NavBar from "./components/NavBar";
import CharacterBrowsingPage from "./views/CharacterBrowsingPage";
import Overview from "./views/Overview";
import SchedulePage from "./views/SchedulePage";
import SchedulePageDay from "./views/SchedulePageDay";
import CharacterDetailedPage from "./views/CharacterDetailedPage";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/characters" element={<CharacterBrowsingPage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule-day" element={<SchedulePageDay />} />
        <Route path="/character-details" element={<CharacterDetailedPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
