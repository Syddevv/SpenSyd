const RecentActs = ({ icon, amount, type }) => {
  const recentActsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#D7E3FF",
    width: "180px",
    borderRadius: "12px",
  };

  const actsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70px",
  };

  const color = type === "expense" ? "#FF6D70" : "#4CAF50";

  return (
    <div style={recentActsStyle}>
      <img src={icon} style={{ width: "40px" }} />
      <div style={actsStyle}>
        <h2 style={{ marginBottom: "0px", color, fontSize: "22px" }}>
          ₱{amount}
        </h2>
        <h5
          style={{
            marginTop: "0px",
            color: "#5C5C5C",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Amount
        </h5>
      </div>
    </div>
  );
};

export default RecentActs;
