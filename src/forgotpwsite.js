import React, { useState } from "react";
import "./style/Register.css";
import { Link } from "react-router-dom";
const ForgotPWsite = () => {
  const [user_email, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user_email") {
      setUserEmail(value);
    } else if (name === "new_password") {
      setNewPassword(value);
    } else if (name === "confirm_password") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword)) {
      setErrorMessage(
        "The password needs to be a minimum of 8 characters and needs to contain a capital letter."
      );
      return;
    }

    const formData = {
      user_email,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch(
        "https://localhost/mdb5react/forgotpwsite.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseBody = await response.text();

      if (response.ok) {
        const result = JSON.parse(responseBody);
        if (result.success) {
          setResetSuccess(true);
          console.log("Reset Successful!");
          window.location.href = "http://localhost:3000/Login";
        } else {
          setErrorMessage(result.message);
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
      {resetSuccess ? (
        <p className="success">Reset successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Password change</h3>
          <label htmlFor="email">Your email:</label>
          <input
            type="email"
            id="email"
            name="user_email"
            value={user_email}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="new_password">New Password:</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={newPassword}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="confirm_password">New Password Confirmation:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <br />

          {errorMessage && <p className="error">{errorMessage}</p>}
          <br />

          <button type="submit">Change Password</button>
        </form>
      )}
    </>
  );
};

export default ForgotPWsite;
