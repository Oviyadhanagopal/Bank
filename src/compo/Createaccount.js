import { useState } from "react";

function CreateAccount({ accounts, setAccounts }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [accountType, setAccountType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [balance, setBalance] = useState("");

  const stateCityData = {
    TamilNadu: ["Chennai", "Tirupur", "Coimbatore", "Madurai", "Trichy"],
    Kerala: ["Kochi", "Trivandrum", "Kozhikode"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    AndhraPradesh: ["Vijayawada", "Vizag", "Guntur"],
  };

  const generateAccountNumber = () => {
    return "MM" + Math.floor(100000 + Math.random() * 900000);
  };

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(balance) <= 0) {
      alert("Initial balance must be greater than 0");
      return;
    }

    const newAccount = {
      id: generateAccountNumber(),
      name: name.trim(),
      dob,
      age: calculateAge(dob),
      gender,
      email,
      aadhar,
      accountType,
      state,
      city,
      balance: Number(balance),
    };

    const updatedAccounts = [...accounts, newAccount];

    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    const history = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify(history));

    alert(
      `🎉 Account Created Successfully
-------------------------
Account ID : ${newAccount.id}
Name       : ${newAccount.name}
Age        : ${newAccount.age}
Type       : ${newAccount.accountType}
City       : ${newAccount.city}
Balance    : ₹${newAccount.balance}`
    );

    setName("");
    setDob("");
    setGender("");
    setEmail("");
    setAadhar("");
    setAccountType("");
    setState("");
    setCity("");
    setBalance("");
  };

  return (
    <div className="page-center">
      <div className="account-card creative">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="account-form">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setName(e.target.value);
              }
            }}
            required
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Aadhar Number"
            value={aadhar}
            maxLength="12"
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setAadhar(e.target.value);
              }
            }}
            required
          />

          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">Account Type</option>
            <option>Savings</option>
            <option>Current</option>
          </select>

          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
            required
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((st) => (
              <option key={st}>{st}</option>
            ))}
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled={!state}
          >
            <option value="">Select City</option>
            {state &&
              stateCityData[state].map((ct) => (
                <option key={ct}>{ct}</option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Initial Balance"
            value={balance}
            min="1"
            onChange={(e) => {
              if (e.target.value >= 0) {
                setBalance(e.target.value);
              }
            }}
            required
          />

          <button className="primary-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;