import IncomeIcon from "../assets/income icon.png";

const IncomeStat = ({ totalBalances }) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(30, 29, 49)",
        width: "170px",
        height: "170px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
      }}
    >
      <img src={IncomeIcon} style={{ width: "60px", marginTop: "10px" }} />
      <h1
        style={{
          color: "#7EFB82",
          fontSize: "25px",
          marginBottom: "0px",
        }}
      >
        <span style={{ fontSize: "30px" }}>₱</span> {totalBalances.toFixed(0)}
      </h1>
      <p
        style={{
          color: "white",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "0px",
        }}
      >
        Balance
      </p>
    </div>
  );
};

export default IncomeStat;
