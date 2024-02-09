import React, { useState } from "react";
import "../style/Register.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";
import passwordRecovery from "../passwordRecovery";
const LoginForm = () => {
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user_email") {
      setUserEmail(value);
    } else if (name === "user_password") {
      setUserPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      user_email,
      user_password,
    };

    try {
      const response = await fetch("https://localhost/mdb5react/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (response.ok) {
        const { success, message, user_data } = responseBody;
        if (success) {
          const { token } = user_data;

          localStorage.setItem("token", token);

          setLoginSuccess(true);
          console.log("Login Successful!");

          window.location.href = "http://localhost:3000/profile";
        } else {
          setErrorMessage(message);
        }
      } else {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        setErrorMessage(
          "Failed to communicate with the server. Please try again later."
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMessage(
        "An unexpected error occurred. Please try again or contact support."
      );
    }
  };

  return (
    <>
      {loginSuccess ? (
        <p className="success">Login successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label htmlFor="user_email">User Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="user_email"
            value={user_email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="user_password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="user_password"
            value={user_password}
            onChange={handleChange}
            required
          />
          <br />
          <Link to="/passwordRecovery">Forgot password?</Link>
          <Link to="/adminlogin">Admin page</Link>
          <br />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Log in</button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
