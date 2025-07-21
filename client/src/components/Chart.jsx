import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const getLast7DaysWithKeys = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    days.push({ key, label });
  }
  return days;
};

const generateChartData = (expenses, balances) => {
  const last7Days = getLast7DaysWithKeys();
  const incomeData = Array(7).fill(0);
  const expenseData = Array(7).fill(0);

  last7Days.forEach((day, idx) => {
    const incomeForDay = balances
      .filter((item) => item.createdAt?.startsWith(day.key))
      .reduce((sum, item) => sum + item.amount, 0);

    const expenseForDay = expenses
      .filter((item) => item.createdAt?.startsWith(day.key))
      .reduce((sum, item) => sum + item.amount, 0);

    incomeData[idx] = incomeForDay;
    expenseData[idx] = expenseForDay;
  });

  return {
    labels: last7Days.map((d) => d.label),
    incomeData,
    expenseData,
  };
};

const Chart = ({ expenses, balances }) => {
  const { labels, incomeData, expenseData } = generateChartData(
    expenses,
    balances
  );

  const chartStyle = {
    backgroundColor: "rgb(30, 29, 49)",
    width: "350px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    borderRadius: "7px",
    justifyContent: "center",
    border: "3px solid #332F55",
  };

  return (
    <div style={chartStyle}>
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
              labels: {
                color: "white",
              },
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
