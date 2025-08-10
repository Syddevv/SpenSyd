import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";
import "../styles/Sidebar.css";
import axios from "axios";
import ExpensesIcon from "../assets/expenses icon.png";
import IncomesIcon from "../assets/income icon.png";
import HomeIcon from "../assets/home.png";
import SettingsIcon from "../assets/account-settings.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const navigation = ["Home", "Expenses", "Incomes", "Settings"];
  const navIcons = [HomeIcon, ExpensesIcon, IncomesIcon, SettingsIcon];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    };
    fetchUser();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={user?.profilePicture || defaultProfile} alt="profile" />
        <div className="profile-info">
          <p className="username">@{user?.username}</p>
          <p className="email">{user?.email}</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navigation.map((text, index) => (
          <Link
            key={text}
            to={`/${text.toLowerCase()}`}
            className={`sidebar__link ${
              location.pathname.includes(text.toLowerCase()) ? "active" : ""
            }`}
          >
            <div className="nav-buttons">
              <img
                src={navIcons[index]}
                alt={`${text} icon`}
                className="nav-icon"
              />
              <span>{text}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
