import React from "react";
import NavBar from "../components/NavBar";
import ExpenseStat from "../components/ExpenseStat";
import IncomeStat from "../components/IncomeStat";
import "../styles/HomePage.css";

const Home = () => {
  return (
    <div className="homePage">
      <NavBar />

      <h1 className="userGreetings">Welcome, Syddu!</h1>

      <div className="statCard">
        <ExpenseStat />
        <IncomeStat />
      </div>
    </div>
  );
};

export default Home;
