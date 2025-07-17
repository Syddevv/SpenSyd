import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Records from "./pages/expensesRecord";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </div>
  );
}

export default App;
