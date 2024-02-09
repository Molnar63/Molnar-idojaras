// adminlogin.js

import React, { useState } from "react";
import "./style/Register.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";

const AdminLoginForm = () => {
  const [admin_email, setAdminEmail] = useState("");
  const [admin_password, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "admin_email") {
      setAdminEmail(value);
    } else if (name === "admin_password") {
      setAdminPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      admin_email,
      admin_password,
    };

    try {
      const response = await fetch(
        "https://localhost/mdb5react/adminlogin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseBody = await response.json();

      if (response.ok) {
        const { success, message, admin_data } = responseBody;
        if (success) {
          const { admin_token } = admin_data;

          localStorage.setItem("admin_token", admin_token);

          setLoginSuccess(true);
          console.log("Admin Login Successful!");

          window.location.href = "http://localhost:3000/admin";
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
        <p className="success">Admin Login successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Admin Login</h3>
          <label htmlFor="admin_email">Admin Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="admin_email"
            value={admin_email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="admin_password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="admin_password"
            value={admin_password}
            onChange={handleChange}
            required
          />
          <br />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Log in</button>
        </form>
      )}
    </>
  );
};

export default AdminLoginForm;
