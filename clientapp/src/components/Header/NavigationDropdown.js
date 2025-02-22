import "../Core/Search.css";
import "./Header.css"
import React from "react";
import NavigationButton from "./NavigationButton";
import { IoIosArrowDown } from "react-icons/io";
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
                                <NavigationButton text="Account Settings" />
                            </Link>
                            <NavigationButton onClick={onLogoutClick} text="Log Out" />
                        </div>
                    </div>
                </div> :
                <div className="center login-container">
                    <button
                        onClick={onLoginClick}
                        className={`auth-button center`}
                    >
                        <span>Log in</span>
                    </button>•
                    <button
                        onClick={onSignUpClick}
                        className={`auth-button center`}
                    >
                        <span>Sign up</span>

                    </button>
                </div>}
        </div>
    );
};

export default NavigationDropdown;
