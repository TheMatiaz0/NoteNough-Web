import "../Core/Search.css";
import "../Header.css"
import React from "react";
import { MdArrowDropDownCircle, MdHowToVote } from "react-icons/md";
import LogOutButton from "./LogOutButton";
import { ImEnter } from "react-icons/im";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

const NavigationDropdown = ({ username, onLogoutClick, onLoginClick, onSignUpClick }) => {
    return (
        <div className="button">
            {username ?
                <div>
                    <div className="dropdown">
                        <button className="auth-button drop-btn">
                            {username}<MdArrowDropDownCircle size="1.2em" />
                        </button>
                        <div className="dropdown-content auth-button">
                            <Link className="auth-button login-btn" to="/account">
                                <MdManageAccounts className="arrow-break" size="1em" />Account Settings
                            </Link>
                            <LogOutButton onClick={onLogoutClick} />
                        </div>
                    </div>
                </div> :
                <div>
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
                </div>}
        </div>
    );
};

export default NavigationDropdown;
