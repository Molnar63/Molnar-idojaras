import React, { useState } from "react";
//import "../style/Register.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

const Login = () => {
  // Állapotok az input mezőkhöz
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Űrlap beküldése eseménykezelő
  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt lehetőség van az űrlapadatok feldolgozására vagy küldésére a szerverre
    console.log("Password:", password);
    console.log("Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        <EmailIcon />
        <br />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        <PasswordIcon />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p>
        <u>Forgot password?</u>
      </p>

      <button type="submit">Login</button>
      <button type="submit">Register</button>
      <button type="submit">Admin</button>
    </form>
  );
};

export default Login;
