import React, { useState } from "react";
import "../style/Register.css";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [user_name, setUserName] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user_name") {
      setUserName(value);
    } else if (name === "user_password") {
      setUserPassword(value);
    } else if (name === "user_email") {
      setUserEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      user_name,
      user_password,
      user_email,
    };

    try {
      const response = await fetch(
        "https://localhost/mdb5react/registration.php",
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
          setRegistrationSuccess(true);
          // You can display a success message here or redirect the user
          // You may also send a confirmation email here if needed
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
      {registrationSuccess ? (
        <p className="success">
          Registration successful! Check your email for confirmation.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Create an account</h3>
          <label htmlFor="user_name">Username:</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="user_name"
            value={user_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="user_password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="user_password"
            value={user_password}
            onChange={handleChange}
            required
          />
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="user_email"
            value={user_email}
            onChange={handleChange}
            required
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Create</button>
          <Link to="/login">Already have an account? Login here</Link>{" "}
          {/* Link to login page */}
        </form>
      )}
    </>
  );
};

export default RegistrationForm;
