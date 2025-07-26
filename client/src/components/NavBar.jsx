import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function toHome() {
    navigate("/home");
  }

  const navStyle = {
    backgroundColor: "rgb(30, 29, 49)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    height: "75px",
    position: "fixed", // 🔹 Fixed position
    top: 0, // 🔹 Stick to top
    width: "100%", // 🔹 Full width
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
    zIndex: 10, // <-- Add this line
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

  return (
    <div>
      <nav style={navStyle}>
        <h2
          style={{ color: "rgb(251, 126, 239)", fontSize: "18px" }}
          onClick={() => toHome()}
        >
          SpenSyd
        </h2>
        <span
          style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </span>
      </nav>

      {/* Overlay for dimming the page */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div style={menuStyle}>
        <Link
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = hoverStyle.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          to={"/home"}
        >
          Home
        </Link>

        <Link
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = hoverStyle.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          to={"/records"}
        >
          Records
        </Link>

        <Link
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = hoverStyle.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          to={"/login"}
          onClick={() => useAuth()}
        >
          Logout
        </Link>
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
