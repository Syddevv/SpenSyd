import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopIncomes from "../components/TopIncomes";
import AllowanceIcon from "../assets/allowance icon.png";
import OthersIcon from "../assets/others icon.png";
import SalaryIcon from "../assets/salary icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IncomesRecord = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);

  const navToExpense = () => {
    navigate("/Records");
  };
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
          <select id="date">
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
            {incomes.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Records
                </td>
              </tr>
            ) : (
              incomes.map((income, index) => (
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
          <TopIncomes
            img={SalaryIcon}
            category={"Salary"}
            percentage={28}
            total={1200}
          />
          <TopIncomes
            img={AllowanceIcon}
            category={"Allowance"}
            percentage={20}
            total={1200}
          />
          <TopIncomes
            img={OthersIcon}
            category={"Others"}
            percentage={18}
            total={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomesRecord;
