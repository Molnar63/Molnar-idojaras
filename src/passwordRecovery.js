import React, { useState } from "react";
import "./style/Register.css";

const PasswordRecovery = () => {
  const [user_email, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailSuccess, setMailSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user_email") {
      setUserEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      user_email,
    };

    try {
      const response = await fetch("https://localhost/mdb5react/forgotpw.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseBody = await response.text();

      if (response.ok) {
        const result = JSON.parse(responseBody);
        if (result.success) {
          setMailSuccess(true);
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
      {mailSuccess ? (
        <p className="success">Mail sending successful</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Forgot Password?</h3>
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" name="send">
            Send Email
          </button>
        </form>
      )}
    </>
  );
};

export default PasswordRecovery;
