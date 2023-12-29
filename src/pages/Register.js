import React, { useState } from "react";
import "../style/Register.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
const Register = () => {
  // Állapotok az input mezőkhöz
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Űrlap beküldése eseménykezelő
  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt lehetőség van az űrlapadatok feldolgozására vagy küldésére a szerverre
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label>
        <PersonIcon />
        <br />
        <input
          type="text"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
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
      <br />
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
      <button type="submit">Submit</button>
      <button type="submit">Login</button>
    </form>
  );
};

export default Register;
