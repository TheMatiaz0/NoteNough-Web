import React from "react";
import Header from "../components/Header";
import {RiPencilFill} from "react-icons/ri";
import LogOutButton from "../components/LogOutButton";

const AccountSettings = ({ }) => {
    return (
        <div className="app-container ">
            <Header />
            <div className="form">
                <LogOutButton/>
                <h1>Account settings</h1>
                <div>
                    <input
                        type="text"
                        autoComplete="email"
                        required
                        maxLength="64"
                        value="TheMatiaz0@protonmail.com"
                    />
                    <RiPencilFill className="auth-icon" />
                </div>
                <div>
                    <input
                        type="text"
                        autoComplete="password"
                        required
                        maxLength="64"
                        value="******"
                    />
                    <RiPencilFill className="auth-icon" />
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;