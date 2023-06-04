import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import NavigationDropdown from "./Account/NavigationDropdown";

const Header = ({ username, showNavigation, onLoginClick, onSignUpClick, onLogoutClick }) => {
  const rootRoute = "/";
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to={rootRoute}>
            <img alt="NoteNough logo" src="logo.svg" />
          </Link>
        </div>
        {showNavigation ? <NavigationDropdown username={username} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} onLogoutClick={onLogoutClick} /> : null}
      </nav>
    </header>
  );
};

export default Header;
