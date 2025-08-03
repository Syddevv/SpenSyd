import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import defaultProfile from "../assets/default-profile.png";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const pathVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div>
      <nav
        style={{
          backgroundColor: "rgb(30, 29, 49)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "75px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {/* Your original profile section - completely preserved */}
        <div className="userProfile">
          <img
            src={user?.profilePicture ? user.profilePicture : defaultProfile}
            alt="profile"
            className="profilePic"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              width: "40px",
              height: "40px",
            }}
          />
          <p
            className="usernameProfile"
            style={{
              color: "white",
              marginLeft: "7px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {user?.username || ""}
          </p>
        </div>

        {/* Animated Menu Button */}
        <motion.button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            outline: "none",
          }}
          onClick={() => setIsOpen(!isOpen)}
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            {/* Burger bars (visible when closed) */}
            <motion.path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              variants={pathVariants}
              initial="closed"
              animate={isOpen ? "closed" : "open"}
            />
            {/* Close icon (visible when open) */}
            <motion.path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              variants={pathVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            />
          </svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                zIndex: 999,
              }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              style={{
                position: "fixed",
                top: "75px",
                right: 0,
                backgroundColor: "#3f3d56",
                width: "100%",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <Link
                to="/home"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "background 0.3s",
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/records"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "background 0.3s",
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => setIsOpen(false)}
              >
                Records
              </Link>
              <Link
                to="/settings"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "background 0.3s",
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
