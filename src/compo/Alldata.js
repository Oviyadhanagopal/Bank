import "../App.css";
import { useEffect, useState } from "react";

export default function AllData() {
  const [accounts, setAccounts] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("accounts")) || [];
    const his = JSON.parse(localStorage.getItem("history")) || [];
    setAccounts(data);
    setHistory(his);
  }, []);

  const maskAadhaar = (num) => {
    if (!num) return "-";
    return "XXXX-XXXX-" + num.slice(-4);
  };

  const viewHistory = (id) => {
    setSelectedId(id);
  };

  const closeHistory = () => {
    setSelectedId(null);
  };

  const filteredHistory = history.filter(
    (h) => h.accountId === selectedId
  );

  return (
    <div className="page-bg dark-bg">
      <h2 className="page-title">All Accounts</h2>

      {accounts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No accounts created yet</p>
      ) : (
        <div className="row-container">

          <div className="account-row header">
            <div className="cell">Name</div>
            <div className="cell">Acc No</div>
            <div className="cell">DOB</div>
            <div className="cell">Age</div>
            <div className="cell">Email</div>
            <div className="cell">Aadhar</div>
            <div className="cell">State</div>
            <div className="cell">City</div>
            <div className="cell">Type</div>
            <div className="cell">Balance</div>
            <div className="cell">View History</div>
          </div>

          {accounts.map((acc) => (
            <div className="account-row" key={acc.id}>
              <div className="cell">{acc.name}</div>
              <div className="cell">{acc.id}</div>
              <div className="cell">{acc.dob}</div>
              <div className="cell">{acc.age}</div>
              <div className="cell">{acc.email}</div>
              <div className="cell">{maskAadhaar(acc.aadhar)}</div>
              <div className="cell">{acc.state}</div>
              <div className="cell">{acc.city}</div>
              <div className="cell">{acc.accountType}</div>
              <div className="cell">₹{acc.balance}</div>


              <div className="cell">
                <button
                  className="view-btn"
                  onClick={() => viewHistory(acc.id)}
                >
                  View History
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedId && (
        <div className="history-modal">
          <div className="history-box">
            <h3>Transaction History - Acc No: {selectedId}</h3>

            {filteredHistory.length === 0 ? (
              <p>No transactions yet</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance After</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((h, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          color:
                            h.type === "Deposit"
                              ? "#00ff88"
                              : "#ff4d4d",
                          fontWeight: "bold",
                        }}
                      >
                        {h.type}
                      </td>
                      <td>₹{h.amount}</td>
                      <td>₹{h.balanceAfter}</td>
                      <td>{h.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="close-btn" onClick={closeHistory}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

