import { useState } from "react";

function Withdraw({ accounts, setAccounts }) {
  const [id, setId] = useState("");
  const [holderName, setHolderName] = useState("");
  const [amount, setAmount] = useState("");

  const handleIdChange = (e) => {
    const inputId = e.target.value;
    setId(inputId);

    const acc = accounts.find((a) => a.id === inputId);
    if (acc) setHolderName(acc.name);
    else setHolderName("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();

    const acc = accounts.find((a) => a.id === id);

    if (!acc) {
      alert("Account not found ❌");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount ❌");
      return;
    }

    if (Number(amount) > acc.balance) {
      alert("Insufficient Balance ❌");
      return;
    }

    const updatedAccounts = accounts.map((a) =>
      a.id === id ? { ...a, balance: a.balance - Number(amount) } : a
    );

    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    const newHistory = {
      accountId: id,
      name: holderName,
      type: "Withdraw",
      amount: Number(amount),
      balanceAfter: updatedAccounts.find((a) => a.id === id).balance,
      date: new Date().toLocaleString(),
    };

    const prevHistory = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem(
      "history",
      JSON.stringify([...prevHistory, newHistory])
    );

    alert(
      `Withdraw Successful 💸\nAmount ₹${amount}\nRemaining Balance ₹${
        updatedAccounts.find((a) => a.id === id).balance
      }`
    );

    setId("");
    setHolderName("");
    setAmount("");
  };

  return (
    <div className="page-center">
      <div className="account-card">
        <h2>Withdraw</h2>

        <form onSubmit={handleWithdraw}>
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

          <input
            type="text"
            inputMode="numeric"
            placeholder="Withdraw Amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />

          <button className="primary-btn">Withdraw</button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
