import React from "react";
import Header from "../components/Header";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import EmailInputField from "../components/EmailInputField";
import PasswordInputField from "../components/PasswordInputField";

const AccountSettings = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <div className="app-container ">
            <Header />
            <div className="form">
                <Link to="/" className="auth-button login-btn">Go Back</Link>
                <LogOutButton />
                <h1>Account Settings</h1>
                <div>
                    <h2>Change Email</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <EmailInputField placeholder="New email" />
                        <PasswordInputField placeholder="Current password" />
                    </form>
                    <h2>Change Password</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <PasswordInputField placeholder="New password" />
                        <PasswordInputField placeholder="Current password" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;