import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ExpenseStat from "../components/ExpenseStat";
import IncomeStat from "../components/IncomeStat";
import "../styles/HomePage.css";
import RecentActWrapper from "../components/RecentActWrapper";
import Chart from "../components/Chart";
import Modal from "../components/Modal";
import newExpenseIcon from "../assets/add expenses icon.png";
import addBalanceIcon from "../assets/add income icon.png";
import "../styles/QuickAccess.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        <div className="controlsContainer">
          <div className="controlsWrapper">
            <div className="newExpense">
              <div>
                <img src={newExpenseIcon} className="quickAccessIcon" />
              </div>
              <p className="label">+ New Expense</p>
            </div>

            <div className="addBalance">
              <div>
                <img src={addBalanceIcon} className="quickAccessIcon" />
              </div>
              <p className="label">+ Balance</p>
            </div>
          </div>

          <p className="groupLabel">Quick Access</p>
        </div>
      </div>

      <div className="chart">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
