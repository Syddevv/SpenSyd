import NavBar from "../components/NavBar";
import "../styles/Expenses.css";

const Expenses = () => {
  return (
    <div className="expensesWrapper">
      <div>
        <NavBar />
      </div>

      <h1 style={{ textAlign: "center", color: "white" }}>EXPENSES HISTORY</h1>
    </div>
  );
};

export default Expenses;
