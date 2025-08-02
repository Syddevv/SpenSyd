import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopIncomes from "../components/TopIncomes";
import Others from "../assets/others icon.png";
import Salary from "../assets/salary icon.png";
import Loan from "../assets/loan icon.png";
import Freelance from "../assets/freelance icon.png";
import Allowance from "../assets/allowance icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCurrentMonth() {
  const now = new Date();
  return now.toLocaleString("default", { month: "long" });
}

const IncomesRecord = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const navToExpense = () => {
    navigate("/Records");
  };
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const icons = {
    others: Others,
    salary: Salary,
    loan: Loan,
    allowance: Allowance,
    freelance: Freelance,
  };

  // ⬇️ Filter incomes by selected month
  const filteredIncomes = incomes.filter((income) => {
    const incomeMonth = new Date(income.date).toLocaleString("default", {
      month: "long",
    });
    return incomeMonth === selectedMonth;
  });

  // ⬇️ Total for current month
  const getTotalForMonth = () => {
    return filteredIncomes.reduce(
      (total, income) => total + Number(income.amount),
      0
    );
  };

  // ⬇️ Top 3 income stats
  function getTop3Incomes(balances) {
    const categoryTotals = {};
    for (const income of balances) {
      const cat = income.category.toLowerCase();
      if (!categoryTotals[cat]) categoryTotals[cat] = 0;
      categoryTotals[cat] += Number(income.amount);
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

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/balance/getBalances`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIncomes(res.data.balances);
      } catch (error) {
        console.log("Error in Fetching Incomes", error.message);
      }
    };
    fetchIncomes();
  }, []);

  return (
    <motion.div
      className="expensesWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <NavBar />
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
            style={{ paddingLeft: "10px" }}
            onClick={() => navToExpense()}
          >
            Expenses
          </p>
          <p
            className="income"
            style={{
              color: "white",
              backgroundColor: "#1e1d31",
              padding: "10px 20px",
              borderRadius: "30px",
            }}
          >
            Income
          </p>
        </div>

        <div className="dateWrapper">
          <select
            id="date"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        className="tableWrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
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
            {filteredIncomes.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Records
                </td>
              </tr>
            ) : (
              filteredIncomes.map((income, index) => (
                <tr key={index}>
                  <td>{capitalizeFirst(income.category)}</td>
                  <td>{new Date(income.date).toLocaleDateString()}</td>
                  <td>₱ {income.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="statsLabel">Statistics - Top 3 Incomes</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {" "}
        <div className="statsWrapper">
          <div className="statsContainer">
            {filteredIncomes.length === 0 ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Incomes
              </p>
            ) : (
              getTop3Incomes(filteredIncomes).map((item, index) => (
                <TopIncomes
                  key={index}
                  img={icons[item.category] || Others}
                  category={item.category}
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
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div>
          <p style={{ color: "white", textAlign: "center", fontSize: "18px" }}>
            <span style={{ color: "rgb(251, 126, 239)", fontWeight: "bold" }}>
              {selectedMonth.toUpperCase()}
            </span>{" "}
            Total Incomes = ₱ {getTotalForMonth().toLocaleString()}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IncomesRecord;
