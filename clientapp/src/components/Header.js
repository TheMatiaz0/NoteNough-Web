import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDownCircle, MdOutlineManageAccounts, MdLogout, MdLogin, MdHowToVote } from "react-icons/md";

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
        {!username ?
          <ul>
            <div className="dropdown">
              <button className="auth-button dropbtn">
                mateusz.kusionowicz@protonmail.com<MdArrowDropDownCircle size="1.2em" />
              </button>
              <div class="dropdown-content auth-button">
                <button onClick={onDeleteAccountClick} className={`auth-button login-btn`}><MdOutlineManageAccounts className="arrow-break" size="1em" />Account settings</button>
                <button onClick={onLogoutClick} className={`auth-button login-btn`}><MdLogout className="arrow-break" size="1em" />Sign out</button>
              </div>
            </div>
          </ul> :
          <ul>
            <button
              onClick={onLoginClick}
              className={`auth-button login-btn`}
            >
              <MdLogin size="1em" /> | Log in
            </button>
            <button
              onClick={onSignUpClick}
              className={`auth-button signup-btn`}
            >
              <MdHowToVote size="1em" /> | Sign up
            </button>
          </ul>}
      </nav>
    </header>
  );
};

export default Header;
