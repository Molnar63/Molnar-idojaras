// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <h1>LOGO</h1>
        <div className="linkek">
          <Link to="/weather">
            <WbSunnyIcon />
            Weather
          </Link>
          <Link to="/register">
            <LoginIcon />
            Login
          </Link>
          <Link to="/profile">
            <PersonIcon /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
