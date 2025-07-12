import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Chart = () => {
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
      <div>
        <Bar
          data={{
            labels: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
              {
                label: "Income",
                data: [500, 1000, 1500, 2000, 2500, 3000, 3500],
                backgroundColor: ["#D49EF8"],
              },
              {
                label: "Expenses",
                data: [700, 1200, 1000, 2500, 2200, 1800, 3700],
                backgroundColor: ["#B5F3F8"],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "white", // Legend text
                },
              },
              tooltip: {
                bodyColor: "white", // Tooltip text
                titleColor: "white",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // X-axis labels
                },
              },
              y: {
                ticks: {
                  color: "white", // Y-axis labels
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
