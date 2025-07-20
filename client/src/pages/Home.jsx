import React, { useEffect, useState } from "react";
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
import { useAuth } from "../context/ContextProvider";
import axios from "axios";

const Home = () => {
  const { user } = useAuth();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalBalances = balances.reduce((sum, item) => sum + item.amount, 0);

  const expenseCategories = [
    "Food",
    "Transport",
    "Grocery",
    "Entertainment",
    "Education",
    "Clothes",
    "Bills",
    "Others",
  ];
  const balanceCategories = ["Salary", "Allowance", "Loan", "Freelance"];

  // Adding Expense
  const addExpense = async (expense) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/expense/addExpense",
        { expense },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Expense Submitted:", res.data);
        setShowExpenseModal(false);
      }
    } catch (error) {
      console.log("Error adding expense:", error.message);
    }
  };

  // Adding Balance
  const addBalance = async (balance) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/balance/addBalance",
        { balance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Balance Submitted:", res.data);
        setShowBalanceModal(false);
      }
    } catch (error) {
      console.log("Error adding balance:", error.message);
    }
  };

  // Fetching Expenses and Balance
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const expenseRes = await axios.get(
        "http://localhost:5000/api/expense/getExpenses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(expenseRes.data.expenses);

      const balanceRes = await axios.get(
        "http://localhost:5000/api/balance/getBalances",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBalances(balanceRes.data.balances);
    };

    fetchData();
  }, [expenses, balances]);

  return (
    <div className="homePage">
      <NavBar />

      {user && <h1 className="userGreetings">Welcome, {user.username}!</h1>}

      <div className="statCard">
        <ExpenseStat totalExpenses={totalExpenses} />
        <IncomeStat totalBalances={totalBalances} />
      </div>

      <div className="recent_Controls">
        <RecentActWrapper />

        <div className="controlsContainer">
          <div className="controlsWrapper">
            <div
              className="newExpense"
              onClick={() => setShowExpenseModal(true)}
            >
              <div>
                <img src={newExpenseIcon} className="quickAccessIcon" />
              </div>
              <p className="label">+ New Expense</p>
            </div>

            <div
              className="addBalance"
              onClick={() => setShowBalanceModal(true)}
            >
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

      <div>
        {showExpenseModal && (
          <Modal
            title="New Expense"
            onClose={() => setShowExpenseModal(false)}
            onSubmit={addExpense}
            categories={expenseCategories}
          />
        )}

        {showBalanceModal && (
          <Modal
            title="Add Balance"
            onClose={() => setShowBalanceModal(false)}
            onSubmit={addBalance}
            categories={balanceCategories}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
