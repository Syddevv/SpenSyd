import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/MobileBottomNav.css";

import HomeIcon from "../assets/home.png";
import ExpensesIcon from "../assets/expenses icon.png";
import IncomesIcon from "../assets/income icon.png";
import SettingsIcon from "../assets/account-settings.png";

const navItems = [
  { path: "/home", label: "Home", icon: HomeIcon },
  { path: "/expenses", label: "Expenses", icon: ExpensesIcon },
  { path: "/incomes", label: "Income", icon: IncomesIcon },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  const handlePrimaryAction = () => {
    if (location.pathname === "/home") {
      window.dispatchEvent(new Event("spensyd:toggle-mobile-actions"));
      return;
    }

    navigate("/home", { state: { openActionMenu: true } });
  };

  return (
    <motion.nav
      className="mobile-bottom-nav"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      aria-label="Primary navigation"
    >
      <div className="mobile-bottom-nav__inner">
        {leftItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mobile-bottom-nav__item ${isActive ? "is-active" : ""}`
            }
          >
            <span className="mobile-bottom-nav__icon-shell">
              <img src={item.icon} alt="" className="mobile-bottom-nav__icon" />
            </span>
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}

        <div className="mobile-bottom-nav__fab-slot">
          <button
            type="button"
            className={`mobile-bottom-nav__fab ${
              location.pathname === "/home" ? "is-home" : ""
            }`}
            onClick={handlePrimaryAction}
            aria-label="Toggle quick actions"
          >
            +
          </button>
        </div>

        {rightItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mobile-bottom-nav__item ${isActive ? "is-active" : ""}`
            }
          >
            <span className="mobile-bottom-nav__icon-shell">
              <img src={item.icon} alt="" className="mobile-bottom-nav__icon" />
            </span>
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;
