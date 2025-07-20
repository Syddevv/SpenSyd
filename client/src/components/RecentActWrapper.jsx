import RecentActs from "./RecentActs";
import Grocery from "../assets/grocery icon.png";
import Clothes from "../assets/clothes icon.png";
import Transport from "../assets/bus icon.png";
import Foods from "../assets/foods icon.png";
import Entertainment from "../assets/entertainment icon.png";
import Education from "../assets/education icon.png";
import Bills from "../assets/bills icon.png";
import Others from "../assets/others icon.png";
import Salary from "../assets/salary icon.png";
import Loan from "../assets/loan icon.png";
import Gift from "../assets/money gift icon.png";
import Freelance from "../assets/freelance icon.png";

const RecentActWrapper = ({ expenses, balances }) => {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(30, 29, 49)",
    height: "270px",
    width: "220px",
    borderRadius: "8px",
    border: "3px solid #332F55",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    gap: "8px",
  };

  const icons = {
    grocery: Grocery,
    clothes: Clothes,
    transport: Transport,
    foods: Foods,
    entertainment: Entertainment,
    education: Education,
    bills: Bills,
    others: Others,
    salary: Salary,
    loan: Loan,
    gift: Gift,
    freelance: Freelance,
  };

  const combinedActivities = [
    ...expenses.map((item) => ({ ...item, type: "expense" })),
    ...balances.map((item) => ({ ...item, type: "income" })),
  ];

  const sortedActivities = combinedActivities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={wrapperStyle}>
        {sortedActivities.map((activity, idx) => (
          <RecentActs
            key={idx}
            icon={icons[activity.category.toLowerCase()] || Others}
            amount={activity.amount}
            type={activity.type}
          />
        ))}
      </div>

      <p
        style={{
          color: "white",
          fontSize: "13px",
          textAlign: "center",
          width: "220px",
          marginTop: "8px",
          fontWeight: "500",
        }}
      >
        Recent Activities
      </p>
    </div>
  );
};

export default RecentActWrapper;
