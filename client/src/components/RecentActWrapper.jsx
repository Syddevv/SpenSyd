import RecentActs from "./RecentActs";
import GroceryIcon from "../assets/grocery icon.png";
import ClothesIcon from "../assets/clothes icon.png";
import SalaryIcon from "../assets/salary icon.png";

const RecentActWrapper = () => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={wrapperStyle}>
        <RecentActs icon={GroceryIcon} amount={400} type={"expense"} />
        <RecentActs icon={ClothesIcon} amount={700} type={"expense"} />
        <RecentActs icon={SalaryIcon} amount={500} type={"income"} />
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
