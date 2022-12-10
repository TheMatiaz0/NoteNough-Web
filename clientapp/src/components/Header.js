import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDownCircle } from "react-icons/md";

const Header = ({ username, onLoginClick, onSignUpClick, onLogoutClick, onDeleteAccountClick }) => {
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
          <ul>
            <div className="dropdown">
              <button className="auth-button dropbtn">
                {username}<MdArrowDropDownCircle size="1.2em" />
              </button>
              <div class="dropdown-content">
                <button onClick={onLogoutClick} className={`auth-button login-btn`}>Log out</button>
                <button onClick={onDeleteAccountClick} className={`auth-button login-btn`}>Delete account</button>
              </div>
            </div>
          </ul> :
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
