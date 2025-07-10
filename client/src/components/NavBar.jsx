import React from "react";

const NavBar = () => {
  const navStyle = {
    backgroundColor: "rgb(30, 29, 49)",
    marginTop: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "20px",
    paddingRight: "20px",
    height: "75px",
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ color: "rgb(251, 126, 239)", fontSize: "18px" }}>SpenSyd</h2>
      <span style={{ color: "white", fontSize: "30px" }}>☰</span>
    </nav>
  );
};

export default NavBar;
