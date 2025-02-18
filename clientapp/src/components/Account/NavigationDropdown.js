import "../Core/Search.css";
import "../Header.css"
import React from "react";
import LogOutButton from "./LogOutButton";
import { IoIosArrowDown } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

const NavigationDropdown = ({ username, onLogoutClick, onLoginClick, onSignUpClick }) => {
    return (
        <div>
            {username ?
                <div>
                    <div className="dropdown">
                        <button className="auth-button">
                            <div className="button-content">
                                <span>{username}</span>
                                <IoIosArrowDown size="0.8em" />
                            </div>
                        </button>
                        <div className="dropdown-content auth-button">
                            <Link className="auth-button login-btn" to="/account">
                                <span className="center"><MdManageAccounts className="arrow-break" size="1em" />Account Settings</span>
                            </Link>
                            <LogOutButton onClick={onLogoutClick} />
                        </div>
                    </div>
                </div> :
                <div className="center">
                    <button
                        onClick={onLoginClick}
                        className={`auth-button login-btn center`}
                    >
                        <span>Log in</span>
                    </button>
                    <button
                        onClick={onSignUpClick}
                        className={`auth-button signup-btn center`}
                    >
                        <span>Sign up</span>

                    </button>
                </div>}
        </div>
    );
};

export default NavigationDropdown;
