import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Sign Up</Link>
          </li>
          <li>
            <Link to="login">Log In</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
