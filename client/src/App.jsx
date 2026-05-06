import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoutes";

// Context
import ContextProvider from "./context/ContextProvider";
import { useAuth } from "./context/ContextProvider";

// Pages
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Expenses from "./pages/ExpensesRecord";
import Incomes from "./pages/IncomesRecord";
import Settings from "./pages/Settings";

// Components
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";

// Analytics
import { Analytics } from "@vercel/analytics/react";
import DefaultProfile from "./assets/default-profile.png";

// --- Internal Layout Component ---
// This wrapper handles the Sidebar and Main Content area
const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const mobileIntroMap = {
    "/home": {
      eyebrow: "Dashboard",
      title: "Overview",
      subtitle: `Welcome back, @${user?.username || "User"}`,
    },
    "/expenses": {
      eyebrow: "Tracking",
      title: "Expenses",
      subtitle: "Review your spending history and monthly totals.",
    },
    "/incomes": {
      eyebrow: "Tracking",
      title: "Income",
      subtitle: "Monitor incoming funds and keep cash flow visible.",
    },
  };

  const mobileIntro = mobileIntroMap[location.pathname];

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <main className="dashboard-main">
        {mobileIntro && (
          <section className="mobile-dashboard-intro">
            <div className="mobile-dashboard-intro__copy">
              <span className="mobile-dashboard-intro__eyebrow">
                {mobileIntro.eyebrow}
              </span>
              <h1 className="mobile-dashboard-intro__title">
                {mobileIntro.title}
              </h1>
              <p className="mobile-dashboard-intro__subtitle">
                {mobileIntro.subtitle}
              </p>
            </div>

            <div className="mobile-dashboard-intro__avatar-shell">
              <img
                src={user?.profilePicture || DefaultProfile}
                alt="Profile"
                className="mobile-dashboard-intro__avatar"
              />
            </div>
          </section>
        )}

        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <ContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>

      <Analytics />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ backgroundColor: "#1e293b", color: "#fff" }}
      />
    </ContextProvider>
  );
}

export default App;
