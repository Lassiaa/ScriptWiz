import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FrontPage from "./views/FrontPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
