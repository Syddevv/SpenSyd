import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import ExpensesIcon from "../assets/expenses icon.png";
import "../styles/StatCard.css";

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
      className="stat-container"
    >
      <div className="stat-icon">
        <img src={ExpensesIcon} alt="Expenses" />
      </div>

      <div className="stat-content">
        <h1 className="stat-amount expense-amount">
          <span className="currency-symbol">₱</span>
          {Math.floor(animatedValue).toLocaleString()}
        </h1>
        <p className="stat-label-expense">
          Total Expenses - <span className="highlight-month">{month}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ExpenseStat;
