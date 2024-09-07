import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FrontPage from "./views/FrontPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
