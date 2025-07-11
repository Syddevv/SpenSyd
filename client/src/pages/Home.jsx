import React from "react";
import NavBar from "../components/NavBar";
import ExpenseStat from "../components/ExpenseStat";
import IncomeStat from "../components/IncomeStat";
import "../styles/HomePage.css";
import RecentActWrapper from "../components/RecentActWrapper";
import QuickAccess from "../components/QuickAccess";

const Home = () => {
  return (
    <div className="homePage">
      <NavBar />

      <h1 className="userGreetings">Welcome, Syddu!</h1>

      <div className="statCard">
        <ExpenseStat />
        <IncomeStat />
      </div>

      <div className="recent_Controls">
        <RecentActWrapper />
        <QuickAccess />
      </div>
    </div>
  );
};

export default Home;
