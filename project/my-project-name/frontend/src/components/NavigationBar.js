import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PinterestLogo from "./Logo/Pinterest";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">
        <button className="logo-button" onClick={handleBackToHome}>
          <PinterestLogo height="25" width="25" className="mb-3" viewBox="0 0 16 16" />
        </button>
      </div>
      <div className="nav-bar-links">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="nav-bar-links">
        <Link to="/settings">Settings</Link>
      </div>
      <div className="nav-bar-links">
        <Link to="/create">Create Your Post</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
