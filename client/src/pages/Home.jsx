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
import { AnimatePresence, motion } from "framer-motion";

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
    <motion.div
      className="homePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NavBar />

      <div style={{ paddingTop: "95px" }}>
        <motion.div
          className="statCard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ExpenseStat totalExpenses={totalExpenses} />
          <IncomeStat currentBalance={currentBalance} />
        </motion.div>

        <motion.div
          className="recent_Controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <RecentActWrapper recentActivities={recentActivities} />

          <div className="controlsContainer">
            <div className="controlsWrapper">
              <motion.div
                className="newExpense"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExpenseModal(true)}
              >
                <div>
                  <img src={newExpenseIcon} className="quickAccessIcon" />
                </div>
                <p className="label">+ New Expense</p>
              </motion.div>

              <motion.div
                className="addBalance"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBalanceModal(true)}
              >
                <div>
                  <img src={addBalanceIcon} className="quickAccessIcon" />
                </div>
                <p className="label">+ Balance</p>
              </motion.div>
            </div>
            <p className="groupLabel">Quick Access</p>
          </div>
        </motion.div>

        <motion.div
          className="chart"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Chart expenses={expenses} balances={balances} />
        </motion.div>

        <div>
          <AnimatePresence>
            {showExpenseModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Modal
                    title="New Expense"
                    onClose={() => setShowExpenseModal(false)}
                    onSubmit={addExpense}
                    categories={expenseCategories}
                    currentBalance={currentBalance}
                    isInnerModal={true}
                  />
                </motion.div>
              </motion.div>
            )}

            {showBalanceModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Modal
                    title="Add Balance"
                    onClose={() => setShowBalanceModal(false)}
                    onSubmit={addBalance}
                    categories={balanceCategories}
                    currentBalance={currentBalance}
                    isInnerModal={true}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
