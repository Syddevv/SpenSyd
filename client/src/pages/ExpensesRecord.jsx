import NavBar from "../components/NavBar";
import "../styles/Records.css";
import TopExpenses from "../components/TopExpenses";
import ClothesIcon from "../assets/clothes icon.png";
import EducationIcon from "../assets/education icon.png";
import FoodsIcon from "../assets/foods icon.png";
import { useNavigate } from "react-router-dom";

const ExpensesRecord = () => {
  const navigate = useNavigate();
  const navToIncome = () => {
    navigate("/IncomesRecord");
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
            <tr>
              <td>Grocery</td>
              <td>07 / 12 / 25</td>
              <td>₱ 1,200</td>
            </tr>
            <tr>
              <td>Entertainment</td>
              <td>07 / 11 / 25</td>
              <td>₱ 500</td>
            </tr>
            <tr>
              <td>Education</td>
              <td>07 / 10 / 25</td>
              <td>₱ 10,000</td>
            </tr>
            <tr>
              <td>Others</td>
              <td>07 / 09 / 25</td>
              <td>₱ 320</td>
            </tr>
            <tr>
              <td>Foods</td>
              <td>07 / 07 / 25</td>
              <td>₱ 180</td>
            </tr>
            <tr>
              <td>Foods</td>
              <td>07 / 07 / 25</td>
              <td>₱ 180</td>
            </tr>
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
