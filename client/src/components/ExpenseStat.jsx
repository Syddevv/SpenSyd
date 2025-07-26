import ExpensesIcon from "../assets/expenses icon.png";

const ExpenseStat = ({ totalExpenses }) => {
  function getCurrentMonth() {
    const now = new Date();
    return now.toLocaleString("default", { month: "long" });
  }
  const month = getCurrentMonth();

  return (
    <div
      style={{
        backgroundColor: "rgb(30, 29, 49)",
        width: "170px",
        height: "170px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
      }}
    >
      <img src={ExpensesIcon} style={{ width: "60px", marginTop: "10px" }} />
      <h1
        style={{
          color: "rgb(251, 126, 239)",
          fontSize: "25px",
          marginBottom: "0px",
        }}
      >
        <span style={{ fontSize: "30px" }}>₱</span> {totalExpenses.toFixed(0)}
      </h1>
      <p
        style={{
          color: "white",
          fontSize: "13px",
          fontWeight: "500",
          marginTop: "0px",
        }}
      >
        Total Expenses -{" "}
        <span style={{ color: "rgb(251, 126, 239)" }}>{month}</span>
      </p>
    </div>
  );
};

export default ExpenseStat;
