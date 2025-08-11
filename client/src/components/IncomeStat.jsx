import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import IncomeIcon from "../assets/income icon.png";
import "../styles/StatCard.css";

const IncomeStat = ({ currentBalance }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const controls = animate(animatedValue, currentBalance, {
      duration: 1.2,
      onUpdate: (latest) => setAnimatedValue(latest),
    });
    return controls.stop;
  }, [currentBalance]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="stat-container-income"
    >
      <div className="stat-icon">
        <img src={IncomeIcon} alt="Income" />
      </div>

      <div className="stat-content">
        <h1 className="stat-amount income-amount">
          <span className="currency-symbol">₱</span>
          {Math.floor(animatedValue).toLocaleString()}
        </h1>
        <p className="stat-label">Balance</p>
      </div>
    </motion.div>
  );
};

export default IncomeStat;
