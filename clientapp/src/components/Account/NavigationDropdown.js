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
        <div>
            {username ?
                <div>
                    <div className="dropdown">
                        <button className="auth-button drop-btn">
                            {username}<MdArrowDropDownCircle size="1.2em" />
                        </button>
                        <div className="dropdown-content auth-button">
                            <Link className="auth-button login-btn" to="/account">
                                <span className="center"><MdManageAccounts className="arrow-break" size="1em" />Account Settings</span>
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
                        <span className="center"><ImEnter size="1em" /> | Log in</span>
                    </button>
                    <button
                        onClick={onSignUpClick}
                        className={`auth-button signup-btn`}
                    >
                        <span className="center"><MdHowToVote size="1em" /> | Sign up</span>

                    </button>
                </div>}
        </div>
    );
};

export default NavigationDropdown;
