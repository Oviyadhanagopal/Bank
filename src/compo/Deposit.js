import { useState } from "react";
import "../App.css";

function Deposit({ accounts, setAccounts }) {
  const [id, setId] = useState("");
  const [holderName, setHolderName] = useState("");

  const [notes, setNotes] = useState({
    n500: "",
    n200: "",
    n100: "",
    n50: "",
  });

  const [total, setTotal] = useState("");

  const handleIdChange = (e) => {
    const val = e.target.value;
    setId(val);
    const acc = accounts.find((a) => a.id === val);
    setHolderName(acc ? acc.name : "");
  };

  const calculateTotal = (updatedNotes) => {
    const amt =
      (updatedNotes.n500 || 0) * 500 +
      (updatedNotes.n200 || 0) * 200 +
      (updatedNotes.n100 || 0) * 100 +
      (updatedNotes.n50 || 0) * 50;

    setTotal(amt);
  };

  const handleNoteChange = (key, value) => {
    const num = Math.max(0, Number(value));
    const updated = { ...notes, [key]: num };
    setNotes(updated);
    calculateTotal(updated);
  };

  const handleDeposit = (e) => {
    e.preventDefault();

    const acc = accounts.find((a) => a.id === id);
    if (!acc) return alert("Account not found ❌");
    if (!total || total <= 0) return alert("Invalid amount ❌");

    const updatedAccounts = accounts.map((a) =>
      a.id === id ? { ...a, balance: a.balance + total } : a
    );

    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    const updatedBalance = updatedAccounts.find(
      (a) => a.id === id
    ).balance;

    const history = JSON.parse(localStorage.getItem("history")) || [];

    history.push({
      accountId: id,
      name: holderName,
      type: "Deposit",
      amount: total,
      balanceAfter: updatedBalance,
      notes,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("history", JSON.stringify(history));

    alert(
      `Deposit Successful 💰 ₹${total}\n\nAvailable Balance : ₹${updatedBalance}`
    );

    setId("");
    setHolderName("");
    setNotes({
      n500: "",
      n200: "",
      n100: "",
      n50: "",
    });
    setTotal("");
  };

  return (
    <div className="page-center">
      <div className="account-card landscape">
        <form onSubmit={handleDeposit}>
          <div className="card-left">
            <h2>Deposit</h2>

            <input
              placeholder="Account ID"
              value={id}
              onChange={handleIdChange}
              required
            />

            <input
              placeholder="Account Holder Name"
              value={holderName}
              readOnly
            />
          </div>

          <div className="card-right">
            <input
              type="number"
              placeholder="₹500 notes"
              value={notes.n500}
              onChange={(e) =>
                handleNoteChange("n500", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="₹200 notes"
              value={notes.n200}
              onChange={(e) =>
                handleNoteChange("n200", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="₹100 notes"
              value={notes.n100}
              onChange={(e) =>
                handleNoteChange("n100", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="₹50 notes"
              value={notes.n50}
              onChange={(e) =>
                handleNoteChange("n50", e.target.value)
              }
            />

            <p className="note-result">
              Deposit Amount : ₹{total || 0}
            </p>

            <button className="primary-btn">
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Deposit;