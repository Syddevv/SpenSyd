import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopExpenses from "../components/TopExpenses";
import Grocery from "../assets/grocery icon.png";
import Clothes from "../assets/clothes icon.png";
import Transport from "../assets/bus icon.png";
import Foods from "../assets/foods icon.png";
import Entertainment from "../assets/entertainment icon.png";
import Education from "../assets/education icon.png";
import Bills from "../assets/bills icon.png";
import Others from "../assets/others icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCurrentMonth() {
  const now = new Date();
  return now.toLocaleString("default", { month: "long" });
}

const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const navToIncome = () => {
    navigate("/Incomes");
  };

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/expense/getExpenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data.expenses);
      } catch (error) {
        console.log("Error in Fetching Expenses", error.message);
      }
    };
    fetchExpenses();
  }, []);

  const icons = {
    grocery: Grocery,
    clothes: Clothes,
    transport: Transport,
    foods: Foods,
    entertainment: Entertainment,
    education: Education,
    bills: Bills,
  };

  // ⬇️ Filter expenses by selected month
  const filteredExpenses = expenses.filter((expense) => {
    const expenseMonth = new Date(expense.date).toLocaleString("default", {
      month: "long",
    });
    return expenseMonth === selectedMonth;
  });

  // ⬇️ Total for current month
  const getTotalForMonth = () => {
    return filteredExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
  };

  // ⬇️ Top 3 stats
  function getTop3Expenses(expenses) {
    const categoryTotals = {};
    for (const expense of expenses) {
      const cat = expense.category.toLowerCase();
      if (!categoryTotals[cat]) categoryTotals[cat] = 0;
      categoryTotals[cat] += Number(expense.amount);
    }

    const totalsArray = Object.keys(categoryTotals).map((cat) => ({
      category: cat,
      total: categoryTotals[cat],
    }));

    totalsArray.sort((a, b) => b.total - a.total);
    const top3 = totalsArray.slice(0, 3);
    const overall = top3.reduce((sum, item) => sum + item.total, 0);

    return top3.map((item) => ({
      ...item,
      percentage: overall ? Math.round((item.total / overall) * 100) : 0,
    }));
  }

  return (
    <motion.div
      className="expensesWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="topNav">
        <NavBar />
      </div>
      <div className="sideNav">
        <Sidebar />
      </div>

      <div style={{ paddingTop: "70px" }}></div>

      <motion.div
        className="controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="categoryControl">
          <p
            className="expenses"
            style={{
              color: "white",
              backgroundColor: "#1e1d31",
              padding: "10px 20px",
              borderRadius: "30px",
            }}
          >
            Expenses
          </p>
          <p className="income" onClick={() => navToIncome()}>
            Income
          </p>
        </div>

        <div className="dateWrapper">
          <select
            id="date"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        className="tableWrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <table className="recordsTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Records
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{capitalizeFirst(expense.category)}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>₱ {Number(expense.amount).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="statsLabel">Statistics - Top 3 Expenses</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="statsWrapper">
          <div className="statsContainer">
            {expenses.length === 0 ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Expenses
              </p>
            ) : (
              getTop3Expenses(filteredExpenses).map((item, index) => (
                <TopExpenses
                  key={index}
                  img={icons[item.category] || Others}
                  category={capitalizeFirst(item.category)}
                  percentage={item.percentage}
                  total={item.total}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {" "}
        <div>
          <p style={{ color: "white", textAlign: "center", fontSize: "18px" }}>
            <span style={{ color: "rgb(251, 126, 239)", fontWeight: "bold" }}>
              {selectedMonth.toUpperCase()}
            </span>{" "}
            Total Expenses = ₱ {getTotalForMonth().toLocaleString()}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Expenses;
