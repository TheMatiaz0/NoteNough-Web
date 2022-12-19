import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDownCircle, MdOutlineManageAccounts, MdLogout, MdLogin, MdHowToVote } from "react-icons/md";
import NavigationButtons from "./NavigationButtons";

const Header = ({ username, showNavigation, onLoginClick, onSignUpClick, onLogoutClick }) => {
  const rootRoute = "/";
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to={rootRoute}>
            <img alt="NoteNough's logo inside header" src="logo.png" />
          </Link>
        </div>
        {showNavigation ? <NavigationButtons username={username} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} onLogoutClick={onLogoutClick} /> : null}
      </nav>
    </header>
  );
};

export default Header;
