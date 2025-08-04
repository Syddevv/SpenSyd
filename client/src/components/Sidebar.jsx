import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";
import "../styles/Sidebar.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

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
        {["Home", "Expenses", "Incomes", "Settings"].map((text) => (
          <Link
            key={text}
            to={`/${text.toLowerCase()}`}
            className={`sidebar__link ${
              location.pathname.includes(text.toLowerCase()) ? "active" : ""
            }`}
          >
            <span>{text}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
