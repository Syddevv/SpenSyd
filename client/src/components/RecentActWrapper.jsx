import { motion, AnimatePresence } from "framer-motion";
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
import Freelance from "../assets/freelance icon.png";
import Allowance from "../assets/allowance icon.png";

const RecentActWrapper = ({ recentActivities }) => {
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
    padding: "8px",
    overflowY: "auto",
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
    allowance: Allowance,
    freelance: Freelance,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={wrapperStyle}>
        {recentActivities.length === 0 ? (
          <p style={{ color: "#bbb", fontSize: "14px" }}>No recent activity</p>
        ) : (
          <AnimatePresence initial={false}>
            {recentActivities.map((activity, index) => (
              <motion.div
                key={`${activity.type}_${activity.amount}_${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <RecentActs
                  icon={icons[activity.category?.toLowerCase()] || Others}
                  amount={activity.amount}
                  type={activity.type}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
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
