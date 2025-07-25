import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopExpenses from "../components/TopExpenses";
import ClothesIcon from "../assets/clothes icon.png";
import EducationIcon from "../assets/education icon.png";
import FoodsIcon from "../assets/foods icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExpensesRecord = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const navToIncome = () => {
    navigate("/IncomesRecord");
  };
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/expense/getExpenses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExpenses(res.data.expenses);
      } catch (error) {
        console.log("Error in Fetching Expenses", error.message);
      }
    };
    fetchExpenses();
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
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Records
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{capitalizeFirst(expense.category)}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>₱ {expense.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="statsLabel">Statistics - Top 3 Expenses</h2>

      <div className="statsWrapper">
        <div className="statsContainer">
          <TopExpenses
            img={ClothesIcon}
            category={"Clothes"}
            percentage={28}
            total={1200}
          />
          <TopExpenses
            img={EducationIcon}
            category={"Education"}
            percentage={20}
            total={1200}
          />
          <TopExpenses
            img={FoodsIcon}
            category={"Foods"}
            percentage={18}
            total={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesRecord;
