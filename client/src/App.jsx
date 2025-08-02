import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Records from "./pages/ExpensesRecord";
import IncomesRecord from "./pages/IncomesRecord";
import Settings from "./pages/Settings";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/records" element={<Records />} />
          <Route path="/IncomesRecord" element={<IncomesRecord />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      </BrowserRouter>
    </div>
  );
}

export default App;
