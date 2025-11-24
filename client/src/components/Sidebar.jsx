import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import "../styles/Sidebar.css";

// Assets
import Logo from "../assets/SpenSyd Icon.png";
import HomeIcon from "../assets/home.png";
import ExpensesIcon from "../assets/expenses icon.png";
import IncomesIcon from "../assets/income icon.png";
import SettingsIcon from "../assets/account-settings.png";
import LogoutIcon from "../assets/logout.png";
import DefaultProfile from "../assets/default-profile.png";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation Config
  const navItems = [
    { path: "/home", label: "Dashboard", icon: HomeIcon },
    { path: "/expenses", label: "Expenses", icon: ExpensesIcon },
    { path: "/incomes", label: "Incomes", icon: IncomesIcon },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`sidebar ${isOpen ? "mobile-open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <img src={Logo} alt="SpenSyd" className="brand-logo" />
          <span className="brand-text">SpenSyd</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => onClose && onClose()} // Close sidebar on mobile when clicked
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer / Profile */}
        <div className="sidebar-footer">
          <div className="user-info">
            <img
              src={user?.profilePicture || DefaultProfile}
              alt="Profile"
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">@{user?.username || "User"}</span>
              <span className="user-email">{user?.email || "Loading..."}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <img src={LogoutIcon} alt="Logout" className="logout-icon" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
