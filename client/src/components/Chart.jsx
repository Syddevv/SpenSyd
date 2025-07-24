import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DatePicker.css";

const Chart = ({ expenses, balances }) => {
  const [viewMode, setViewMode] = useState("past"); // "past", "future", "custom"
  const [customStart, setCustomStart] = useState(new Date());
  const [customEnd, setCustomEnd] = useState(new Date());

  // Format a single date into { key: 'YYYY-MM-DD', label: 'Jul 22' }
  const formatDay = (date) => ({
    key: date.toISOString().split("T")[0],
    label: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  });

  const getDaysWithKeys = (mode) => {
    const days = [];

    if (mode === "past") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(formatDay(d));
      }
    } else if (mode === "future") {
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push(formatDay(d));
      }
    } else if (mode === "custom") {
      let d = new Date(customStart);
      while (d <= customEnd) {
        days.push(formatDay(new Date(d)));
        d.setDate(d.getDate() + 1);
      }
    }

    return days;
  };

  const generateChartData = (expenses, balances, mode) => {
    const days = getDaysWithKeys(mode);
    const incomeData = Array(days.length).fill(0);
    const expenseData = Array(days.length).fill(0);

    days.forEach((day, idx) => {
      const income = balances
        .filter((i) => i.createdAt?.startsWith(day.key))
        .reduce((sum, i) => sum + i.amount, 0);

      const expense = expenses
        .filter((e) => e.createdAt?.startsWith(day.key))
        .reduce((sum, e) => sum + e.amount, 0);

      incomeData[idx] = income;
      expenseData[idx] = expense;
    });

    return {
      labels: days.map((d) => d.label),
      incomeData,
      expenseData,
    };
  };

  const { labels, incomeData, expenseData } = generateChartData(
    expenses,
    balances,
    viewMode
  );

  const chartStyle = {
    backgroundColor: "rgb(30, 29, 49)",
    width: "350px",
    padding: "20px",
    borderRadius: "7px",
    border: "3px solid #332F55",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={chartStyle}>
      {/* View Mode Selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "0px",
        }}
      >
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            backgroundColor: "#1E1D31",
            color: "white",
            border: "1px solid #332F55",
            borderRadius: "5px",
            padding: "6px 10px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <option value="past">Last 7 Days</option>
          <option value="future">Next 7 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Date Pickers */}
      {viewMode === "custom" && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <DatePicker
            className="custom-datepicker"
            selected={customStart}
            onChange={(date) => setCustomStart(date)}
            selectsStart
            startDate={customStart}
            endDate={customEnd}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            className="custom-datepicker"
            selected={customEnd}
            onChange={(date) => setCustomEnd(date)}
            selectsEnd
            startDate={customStart}
            endDate={customEnd}
            minDate={customStart}
            maxDate={new Date(new Date().setFullYear(2099))}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      )}

      {/* Chart */}
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "#D49EF8",
            },
            {
              label: "Expenses",
              data: expenseData,
              backgroundColor: "#B5F3F8",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "white" },
            },
            tooltip: {
              bodyColor: "white",
              titleColor: "white",
            },
          },
          scales: {
            x: {
              ticks: { color: "white" },
            },
            y: {
              ticks: { color: "white" },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
