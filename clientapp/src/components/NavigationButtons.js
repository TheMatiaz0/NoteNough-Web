import "./Search.css";
import React from "react";
import { MdArrowDropDownCircle, MdHowToVote, MdOutlineManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { ImEnter } from "react-icons/im";

const NavigationButtons = ({ username, onLogoutClick, onLoginClick, onSignUpClick}) => {
    return (
        <div>
        {username ?
        <ul>
            <div className="dropdown">
                <button className="auth-button drop-btn">
                    {username}<MdArrowDropDownCircle size="1.2em" />
                </button>
                <div className="dropdown-content auth-button">
                    <Link to="/account"  className={`auth-button login-btn`}><MdOutlineManageAccounts className="arrow-break" size="1em" />Account settings</Link>
                    <LogOutButton onClick={onLogoutClick} />
                </div>
            </div>
        </ul> :
        <ul>
            <button
                onClick={onLoginClick}
                className={`auth-button login-btn`}
            >
                <ImEnter size="1em" /> | Log in
            </button>
            <button
                onClick={onSignUpClick}
                className={`auth-button signup-btn`}
            >
                <MdHowToVote size="1em" /> | Sign up
            </button>
        </ul>}
        </div>
    );
};

export default NavigationButtons;
