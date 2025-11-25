import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners"; // Use named import if default fails, or check package
import { useAuth } from "../context/ContextProvider";

// Components
import Chart from "../components/Chart";
import Modal from "../components/Modal";

// Assets & Styles
import "../styles/HomePage.css";
import IncomeIcon from "../assets/income icon.png";
import ExpenseIcon from "../assets/expenses icon.png";
import WalletIcon from "../assets/money gift icon.png"; // Using as balance icon

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // Modals
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  // Categories
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
  const incomeCategories = [
    "Salary",
    "Allowance",
    "Loan",
    "Freelance",
    "Others",
  ];

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemPop = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  const itemFadeRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemFadeLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [expRes, incRes, actRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/expense/getExpenses`, { headers }),
          axios.get(`${BASE_URL}/api/balance/getBalances`, { headers }),
          axios.get(`${BASE_URL}/api/activity/recent`, { headers }),
        ]);

        setExpenses(expRes.data.expenses);
        setIncomes(incRes.data.balances);
        setRecentActivity(actRes.data.activities);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  // --- Calculations ---
  const totalExpenses = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const totalIncome = incomes.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const currentBalance = totalIncome - totalExpenses;

  // --- Handlers ---
  const handleAddExpense = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/expense/addExpense`,
        { expense: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefresh((prev) => !prev);
      setShowExpenseModal(false);
    } catch (error) {
      console.error("Add Expense Error", error);
    }
  };

  const handleAddIncome = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/balance/addBalance`,
        { balance: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefresh((prev) => !prev);
      setShowIncomeModal(false);
    } catch (error) {
      console.error("Add Income Error", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#8b5cf6" size={50} />
      </div>
    );
  }

  return (
    <motion.div
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.header className="welcome-section" variants={itemFadeUp}>
        <h1 className="welcome-title">Overview</h1>
        <p className="welcome-subtitle">
          Welcome back, @{user?.username || "User"}
        </p>
      </motion.header>

      {/* Top Row: Stats Cards */}
      <section className="stats-grid">
        <motion.div
          className="stat-card glass-panel balance"
          variants={itemPop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-header">
            <img
              src={WalletIcon}
              alt="icon"
              style={{ width: 24, opacity: 0.8 }}
            />
            <span>Total Balance</span>
          </div>
          <div className="stat-value">₱ {currentBalance.toLocaleString()}</div>
        </motion.div>

        <motion.div
          className="stat-card glass-panel income"
          variants={itemPop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-header">
            <img
              src={IncomeIcon}
              alt="icon"
              style={{ width: 24, opacity: 0.8 }}
            />
            <span>Total Income</span>
          </div>
          <div className="stat-value">₱ {totalIncome.toLocaleString()}</div>
        </motion.div>

        <motion.div
          className="stat-card glass-panel expense"
          variants={itemPop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-header">
            <img
              src={ExpenseIcon}
              alt="icon"
              style={{ width: 24, opacity: 0.8 }}
            />
            <span>Total Expense</span>
          </div>
          <div className="stat-value">₱ {totalExpenses.toLocaleString()}</div>
        </motion.div>
      </section>

      {/* Middle Row: Chart & Actions */}
      <section className="main-grid">
        <motion.div
          className="chart-section glass-panel"
          variants={itemFadeRight}
        >
          <div className="section-header">
            <h3 className="section-title">Financial Analytics</h3>
          </div>
          <Chart expenses={expenses} balances={incomes} />
        </motion.div>

        <motion.div
          className="actions-section glass-panel"
          variants={itemFadeLeft}
        >
          <div className="section-header">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          <motion.button
            className="action-btn add-income"
            onClick={() => setShowIncomeModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>+</span> Add Income
          </motion.button>
          <motion.button
            className="action-btn add-expense"
            onClick={() => setShowExpenseModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>-</span> Add Expense
          </motion.button>
        </motion.div>
      </section>

      {/* Bottom Row: Recent Transactions */}
      <motion.section
        className="recent-section glass-panel"
        variants={itemFadeUp}
      >
        <div className="section-header">
          <h3 className="section-title">Recent Transactions</h3>
        </div>
        <div className="transaction-list">
          {recentActivity.length === 0 ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
              No recent activity.
            </p>
          ) : (
            recentActivity.map((item, index) => (
              <motion.div
                key={index}
                className="transaction-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="t-info">
                  <div className="t-icon">
                    {item.type === "income" ? "💰" : "🛍️"}
                  </div>
                  <div className="t-details">
                    <span className="t-category">{item.category}</span>
                    <span className="t-date">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className={`t-amount ${item.type}`}>
                  {item.type === "income" ? "+" : "-"} ₱
                  {item.amount.toLocaleString()}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      {/* Modals */}
      <AnimatePresence>
        {showExpenseModal && (
          <motion.div
            className="modalBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal
              title="Add Expense"
              onClose={() => setShowExpenseModal(false)}
              onSubmit={handleAddExpense}
              categories={expenseCategories}
              currentBalance={currentBalance}
            />
          </motion.div>
        )}

        {showIncomeModal && (
          <motion.div
            className="modalBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal
              title="Add Income"
              onClose={() => setShowIncomeModal(false)}
              onSubmit={handleAddIncome}
              categories={incomeCategories}
              currentBalance={currentBalance}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
