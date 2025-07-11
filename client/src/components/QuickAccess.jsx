import newExpenseIcon from "../assets/add expenses icon.png";
import addBalanceIcon from "../assets/add income icon.png";

const QuickAccess = () => {
  const controlsStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1E1D31",
    width: "120px",
    height: "270px",
    marginTop: "0px",
    borderRadius: "7px",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  };

  const controlsWrapper = {
    backgroundColor: "#262626",
    width: "95px",
    height: "105px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "7px",
    flexDirection: "column",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={controlsStyle}>
        <div style={controlsWrapper} className="newExpense">
          <div>
            <img
              src={newExpenseIcon}
              style={{
                width: "60px",
                backgroundColor: "#FF8C8C",
                padding: "10px",
                borderRadius: "30px",
              }}
            />
          </div>
          <p
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              color: "white",
              fontSize: "10px",
              fontWeight: "500",
            }}
          >
            + New Expense
          </p>
        </div>

        <div style={controlsWrapper} className="addBalance">
          <div>
            <img
              src={addBalanceIcon}
              style={{
                width: "60px",
                backgroundColor: "#8CFFC0",
                padding: "10px",
                borderRadius: "30px",
              }}
            />
          </div>
          <p
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              color: "white",
              fontSize: "10px",
              fontWeight: "500",
            }}
          >
            + Balance
          </p>
        </div>
      </div>

      <p
        style={{
          color: "white",
          fontSize: "13px",
          textAlign: "center",
          width: "120px",
          marginTop: "8px",
          fontWeight: "500",
        }}
      >
        Quick Access
      </p>
    </div>
  );
};

export default QuickAccess;
