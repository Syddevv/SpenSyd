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
import defaultProfile from "../assets/default-profile.png";

const Home = () => {
  const { user } = useAuth();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getCurrentMonth = () => {
    const now = new Date();
    return now.getMonth();
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  // Filter current month expenses
  const filteredExpenses = expenses.filter((item) => {
    const expenseDate = new Date(item.date);
    return (
      expenseDate.getMonth() === getCurrentMonth() &&
      expenseDate.getFullYear() === getCurrentYear()
    );
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalBalances = balances.reduce((sum, item) => sum + item.amount, 0);
  const overallExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const currentBalance = totalBalances - overallExpenses;

  const expenseCategories = [
    "Foods",
    "Transport",
    "Grocery",
    "Entertainment",
    "Education",
    "Clothes",
    "Bills",
    "Others",
  ];
  const balanceCategories = [
    "Salary",
    "Allowance",
    "Loan",
    "Freelance",
    "Others",
  ];

  const pushRecentActivity = (activity, type) => {
    const newAct = { ...activity, type };
    const updated = [newAct, ...recentActivities].slice(0, 3);
    setRecentActivities(updated);
    if (user && user.username) {
      localStorage.setItem(
        `recentActivities_${user.username}`,
        JSON.stringify(updated)
      );
    }
  };

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
        const newExpense = {
          ...expense,
          amount: Number(expense.amount),
          date: expense.date,
        };
        setExpenses((prev) => [newExpense, ...prev]);
        pushRecentActivity(newExpense, "expense");
        setShowExpenseModal(false);
        setRefresh((r) => !r);
      }
    } catch (error) {
      console.log("Error adding expense:", error.message);
    }
  };

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
        const newBalance = {
          ...balance,
          amount: Number(balance.amount),
          date: balance.date,
        };
        setBalances((prev) => [newBalance, ...prev]);
        pushRecentActivity(newBalance, "income");
        setShowBalanceModal(false);
        setRefresh((r) => !r);
      }
    } catch (error) {
      console.log("Error adding balance:", error.message);
    }
  };

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
  }, [refresh]);

  useEffect(() => {
    if (user && user.username) {
      const saved = localStorage.getItem(`recentActivities_${user.username}`);
      if (saved) {
        setRecentActivities(JSON.parse(saved));
      }
    }
  }, [user]);

  return (
    <div className="homePage">
      <NavBar />

      <div style={{ paddingTop: "95px" }}>
        <div className="statCard">
          <ExpenseStat totalExpenses={totalExpenses} />
          <IncomeStat currentBalance={currentBalance} />
        </div>

        <div className="recent_Controls">
          <RecentActWrapper recentActivities={recentActivities} />

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
          <Chart expenses={expenses} balances={balances} />
        </div>

        <div>
          {showExpenseModal && (
            <Modal
              title="New Expense"
              onClose={() => setShowExpenseModal(false)}
              onSubmit={addExpense}
              categories={expenseCategories}
              currentBalance={currentBalance}
            />
          )}

          {showBalanceModal && (
            <Modal
              title="Add Balance"
              onClose={() => setShowBalanceModal(false)}
              onSubmit={addBalance}
              categories={balanceCategories}
              currentBalance={currentBalance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
