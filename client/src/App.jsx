import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
