
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./compo/Home";
import CreateAccount from "./compo/Createaccount";
import Deposit from "./compo/Deposit";
import Withdraw from "./compo/Withdraw";
import AllData from "./compo/Alldata";
import Statement from "./compo/Statement";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <BrowserRouter>
      <div className="app">

        <nav className="navbar">
          <div className="nav-left">
            <h2>MoneyMint Bank</h2>
          </div>

          <div className="nav-right">
            <Link to="/"><button>Home</button></Link>
            <Link to="/create"><button>Create Account</button></Link>
            <Link to="/deposit"><button>Deposit</button></Link>
            <Link to="/withdraw"><button>Withdraw</button></Link>
            <Link to="/all"><button>All Data</button></Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/create"
            element={<CreateAccount accounts={accounts} setAccounts={setAccounts} />}
          />

          <Route
            path="/deposit"
            element={<Deposit accounts={accounts} setAccounts={setAccounts} />}
          />

          <Route
            path="/withdraw"
            element={<Withdraw accounts={accounts} setAccounts={setAccounts} />}
          />

         
          <Route path="/all" element={<AllData />} />

          
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
