import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import ExpensesIcon from "../assets/expenses icon.png";

const ExpenseStat = ({ totalExpenses }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const controls = animate(animatedValue, totalExpenses, {
      duration: 1.2,
      onUpdate: (latest) => setAnimatedValue(latest),
    });
    return controls.stop;
  }, [totalExpenses]);

  function getCurrentMonth() {
    const now = new Date();
    return now.toLocaleString("default", { month: "long" });
  }
  const month = getCurrentMonth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: "rgb(30, 29, 49)",
        width: "170px",
        height: "170px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <img src={ExpensesIcon} style={{ width: "60px", marginTop: "10px" }} />
      <h1
        style={{
          color: "rgb(251, 126, 239)",
          fontSize: "25px",
          marginBottom: "0px",
          fontWeight: "600",
        }}
      >
        <span style={{ fontSize: "30px" }}>₱</span>{" "}
        {Math.floor(animatedValue).toLocaleString()}
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
    </motion.div>
  );
};

export default ExpenseStat;
