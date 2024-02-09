import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div>
      <h3>Are you sure you want to logout?</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
