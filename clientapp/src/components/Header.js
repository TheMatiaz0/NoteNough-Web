import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ username, onLoginClick, onSignUpClick, onLogoutClick }) => {
  const rootRoute = "/";
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to={rootRoute}>
            <img alt="test" src="logo.png" />
          </Link>
        </div>
        {username ?
          <div>
            <span>{username}</span>
            <button onClick={onLogoutClick} className={`auth-button login-btn`}>Log out</button>
          </div> :
          <ul>
            <button
              onClick={onLoginClick}
              className={`auth-button login-btn`}
            >
              Login
            </button>
            <button
              onClick={onSignUpClick}
              className={`auth-button signup-btn`}
            >
              Sign up
            </button>
          </ul>}

      </nav>
    </header>
  );
};

export default Header;
