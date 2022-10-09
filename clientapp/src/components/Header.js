import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLoginClick, onSignUpClick }) => {
  const rootRoute = "/";
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to={rootRoute}>
            <img alt="test" src="logo.png" />
          </Link>
        </div>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
