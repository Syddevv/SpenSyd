import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import IncomeIcon from "../assets/income icon.png";

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
      <img src={IncomeIcon} style={{ width: "60px", marginTop: "10px" }} />
      <h1
        style={{
          color: "#7EFB82",
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
        Balance
      </p>
    </motion.div>
  );
};

export default IncomeStat;
