import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [emisPaid, setEmisPaid] = useState(0);
  const [moratoriumMonths, setMoratoriumMonths] = useState(0);
  const [compoundType, setCompoundType] = useState("after");
  const [interestOverdue, setInterestOverdue] = useState(0);

  const calculateOverdue = () => {
    const monthlyInterest = (loanAmount * interestRate) / 100 / 12;
    let overdue = 0;

    if (compoundType === "monthly") {
      overdue =
        loanAmount * Math.pow(1 + interestRate / 100 / 12, moratoriumMonths) -
        loanAmount;
    } else {
      overdue = monthlyInterest * moratoriumMonths;
    }

    setInterestOverdue(overdue);
  };

  useEffect(() => {
    calculateOverdue();
  }, [loanAmount, interestRate, moratoriumMonths, compoundType]);

  return (
    <div className="calculator">
      <h2>Moratorium Option Calculator</h2>

      <div className="section">
        <label>Loan Amount (in ₹)</label>
        <input
          type="text"
          value={loanAmount.toLocaleString("en-IN")}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (!isNaN(raw)) {
              setLoanAmount(Number(raw));
            }
          }}
        />
        <input
          type="range"
          min="100000"
          max="50000000"
          step="10000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />
      </div>

      <div className="input-row">
        <div className="label">
          Total Loan Tenure
          <br />
          (in Months)
        </div>
        <input
          type="number"
          value={loanTenure === 0 ? "" : loanTenure}
          onChange={(e) => {
            const val = e.target.value.replace(/^0+/, ""); // Remove leading zeros
            setLoanTenure(Number(val));
          }}
        />
      </div>

      <div className="input-row">
        <div className="label">Interest rate (%)</div>
        <input
          type="number"
          value={interestRate === 0 ? "" : interestRate}
          onChange={(e) => {
            const val = e.target.value.replace(/^0+/, "");
            setInterestRate(Number(val));
          }}
        />
      </div>

      <div className="input-row">
        <div className="label">
          EMIs Paid till date <br />
          (in Months)
        </div>
        <input
          type="number"
          value={emisPaid === 0 ? "" : emisPaid}
          onChange={(e) => {
            const val = e.target.value.replace(/^0+/, "");
            setEmisPaid(Number(val));
          }}
        />
      </div>

      <div className="section">
        <label>Compound Interest Option</label>
        <div className="compound-buttons">
          <button
            className={compoundType === "after" ? "active" : ""}
            onClick={() => setCompoundType("after")}
          >
            After Moratorium Period
          </button>
          <button
            className={compoundType === "monthly" ? "active" : ""}
            onClick={() => setCompoundType("monthly")}
          >
            Monthly (Like Credit Cards)
          </button>
        </div>
      </div>

      <div className="section">
        <label>Moratorium Months</label>
        <div className="moratorium-buttons">
          {[0, 1, 2, 3].map((m) => (
            <button
              key={m}
              className={moratoriumMonths === m ? "active" : ""}
              onClick={() => setMoratoriumMonths(m)}
            >
              {m === 0 ? "Not Availed" : m}
            </button>
          ))}
        </div>
      </div>

      <div className="interest-box">
        <div className="interest-label">
          <span>
            Interest Overdue
            <br />
            after {moratoriumMonths}{" "}
            {moratoriumMonths === 1 ? "month" : "months"}
          </span>
        </div>
        <div className="interest-value">
          ₹{" "}
          {interestOverdue.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      <button className="calculate-btn" onClick={calculateOverdue}>
        CALCULATE
      </button>

      <p className="footer">COVID 19 - Stay Inside Stay Safe</p>
    </div>
  );
};

export default App;
