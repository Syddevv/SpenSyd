import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopIncomes from "../components/TopIncomes";
import AllowanceIcon from "../assets/allowance icon.png";
import OthersIcon from "../assets/others icon.png";
import SalaryIcon from "../assets/salary icon.png";
import { useNavigate } from "react-router-dom";

const IncomesRecord = () => {
  const navigate = useNavigate();
  const navToExpense = () => {
    navigate("/Records");
  };

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
            <tr>
              <td>Salary</td>
              <td>07 / 12 / 25</td>
              <td>₱ 1,200</td>
            </tr>
            <tr>
              <td>Allowance</td>
              <td>07 / 11 / 25</td>
              <td>₱ 500</td>
            </tr>
            <tr>
              <td>Salary</td>
              <td>07 / 10 / 25</td>
              <td>₱ 10,000</td>
            </tr>
            <tr>
              <td>Freelance</td>
              <td>07 / 09 / 25</td>
              <td>₱ 320</td>
            </tr>
            <tr>
              <td>Loan</td>
              <td>07 / 07 / 25</td>
              <td>₱ 180</td>
            </tr>
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
