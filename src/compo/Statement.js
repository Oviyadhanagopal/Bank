// import "../App.css";
// import { useEffect, useState } from "react";

// export default function Statement() {
//   const [accountId, setAccountId] = useState("");
//   const [history, setHistory] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("history")) || [];
//     setHistory(data);
//   }, []);

//   const handleSearch = () => {
//     if (!accountId) {
//       alert("Enter Account ID");
//       return;
//     }

//     const result = history.filter(
//       (h) => h.accountId === accountId
//     );

//     setFiltered(result);
//   };

//   return (
//     <div className="page-bg dark-bg">
//       <h2 className="page-title">Account Statement</h2>

//       {/* Search box */}
//       <div className="statement-search">
//         <input
//           placeholder="Enter Account ID"
//           value={accountId}
//           onChange={(e) => setAccountId(e.target.value)}
//         />
//         <button onClick={handleSearch}>View Statement</button>
//       </div>

//       {/* Result */}
//       {filtered.length === 0 ? (
//         <p className="no-data">No transactions found</p>
//       ) : (
//         <div className="row-container">
//           {filtered.map((tx, index) => (
//             <div className="statement-row" key={index}>
//               <div className="cell">{tx.date}</div>
//               <div className="cell">{tx.type}</div>
//               <div className="cell">₹{tx.amount}</div>
//               <div className="cell">{tx.notes}</div>
//               <div className="cell balance">
//                 ₹{tx.balanceAfter}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








import "../App.css";
import React, { useEffect, useState } from "react";

 function Statement() {
  const [accountId, setAccountId] = useState("");
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  }, []);

  const handleSearch = () => {
    if (!accountId) {
      alert("Enter Account ID");
      return;
    }

    const result = history.filter((h) => h.accountId === accountId);
    setFiltered(result);
  };

  return React.createElement(
    "div",
    { className: "page-bg dark-bg" },

    React.createElement(
      "h2",
      { className: "page-title" },
      "Account Statement"
    ),

    /* Search box */
    React.createElement(
      "div",
      { className: "statement-search" },

      React.createElement("input", {
        placeholder: "Enter Account ID",
        value: accountId,
        onChange: (e) => setAccountId(e.target.value),
      }),

      React.createElement(
        "button",
        { onClick: handleSearch },
        "View Statement"
      )
    ),

    /* Result */
    filtered.length === 0
      ? React.createElement(
          "p",
          { className: "no-data" },
          "No transactions found"
        )
      : React.createElement(
          "div",
          { className: "row-container" },

          filtered.map((tx, index) =>
            React.createElement(
              "div",
              { className: "statement-row", key: index },

              React.createElement(
                "div",
                { className: "cell" },
                tx.date
              ),

              React.createElement(
                "div",
                { className: "cell" },
                tx.type
              ),

              React.createElement(
                "div",
                { className: "cell" },
                "₹" + tx.amount
              ),

              React.createElement(
                "div",
                { className: "cell" },
                tx.notes
              ),

              React.createElement(
                "div",
                { className: "cell balance" },
                "₹" + tx.balanceAfter
              )
            )
          )
        )
  );
}

export default Statement;