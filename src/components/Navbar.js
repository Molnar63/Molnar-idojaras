import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </div>
        <div className={`links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/weather">
            <WbSunnyIcon />
            Weather
          </Link>
          {isLoggedIn ? (
            <Link to="/logout">
              <LoginIcon />
              Logout
            </Link>
          ) : (
            <Link to="/register">
              <LoginIcon />
              Register
            </Link>
          )}
          <Link to="/profile">
            <PersonIcon /> Profile
          </Link>
          <Link to="/time">
            <AccessTimeIcon /> Time
          </Link>
          <Link to="/weathernews">
            <NewspaperIcon /> News
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
