import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navStyle = {
    backgroundColor: "rgb(30, 29, 49)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    height: "75px",
    position: "relative",
    zIndex: 10,
  };

  const menuStyle = {
    position: "absolute",
    top: "75px",
    right: 0,
    backgroundColor: "#3f3d56",
    width: "100%",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    display: isOpen ? "block" : "none",
    animation: isOpen ? "slideDown 0.3s ease forwards" : "none",
  };

  const linkStyle = {
    display: "block",
    padding: "15px 20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "background 0.3s",
  };

  const hoverStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  const links = ["Home", "Expenses", "Incomes", "Logout"];

  return (
    <div>
      <nav style={navStyle}>
        <h2 style={{ color: "rgb(251, 126, 239)", fontSize: "18px" }}>
          SpenSyd
        </h2>
        <span
          style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </span>
      </nav>

      <div style={menuStyle}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={`/${link}`}
            style={linkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = hoverStyle.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {link}
          </Link>
        ))}
      </div>

      {/* Keyframe animation */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NavBar;
