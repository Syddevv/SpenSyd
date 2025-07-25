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

  function getTop3Incomes(incomes) {
    // 1. Total incomes per category
    const categoryTotals = {};

    for (const income of incomes) {
      const cat = income.category.toLowerCase();
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += Number(income.amount);
    }

    // 2. Convert to array of objects
    const totalsArray = Object.keys(categoryTotals).map((cat) => ({
      category: cat,
      total: categoryTotals[cat],
    }));

    // 3. Sort by total descending
    totalsArray.sort((a, b) => b.total - a.total);

    // 4. Take top 3
    const top3 = totalsArray.slice(0, 3);

    // 5. Compute overall total of top 3
    const overall = top3.reduce((sum, item) => sum + item.total, 0);

    // 6. Add percentage to each
    return top3.map((item) => ({
      ...item,
      percentage: Math.round((item.total / overall) * 100),
    }));
  }

  const filteredIncomes = selectedMonth
    ? incomes.filter((income) => {
        const incomeMonth = new Date(income.date).toLocaleString("default", {
          month: "long",
        });
        return incomeMonth === selectedMonth;
      })
    : incomes;

  function getCurrentMonth() {
    const now = new Date();
    return now.toLocaleString("default", { month: "long" });
  }

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/balance/getBalances",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIncomes(res.data.balances);
      } catch (error) {
        console.log("Error in Fetching Incomes", error.message);
      }
    };
    fetchIncomes();
  }, []);

  return (
    <div className="expensesWrapper">
      <div>
        <NavBar />
      </div>

      <div style={{ paddingTop: "70px" }}></div>

      <div className="controls">
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
      </div>

      <div className="tableWrapper">
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
      </div>

      <h2 className="statsLabel">Statistics - Top 3 Incomes</h2>

      <div className="statsWrapper">
        <div className="statsContainer">
          {filteredIncomes.length === 0 ? (
            <p style={{ textAlign: "center", fontWeight: "600" }}>No Incomes</p>
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
    </div>
  );
};

export default IncomesRecord;
