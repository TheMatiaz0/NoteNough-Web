import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import EmailInputField from "../components/EmailInputField";
import PasswordInputField from "../components/PasswordInputField";

const AccountSettings = (submitEmailChange, submitPasswordChange, submitAccountDelete) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleSubmitEmail = async (event) => {
        event.preventDefault();

        const result = await submitEmailChange({ newEmail: newEmail, currentPassword: currentPassword });
        if (result) {
            setCurrentPassword("");
            setNewEmail("");
        }
    };

    const handleSubmitPassword = async (event) => {
        event.preventDefault();

        const result = await submitPasswordChange({ currentPassword: currentPassword, newPassword: newPassword });
        if (result) {
            setCurrentPassword("");
            setNewPassword("");
        }
    }

    const handleDeleteAccount = async (event) => {
        event.preventDefault();

        const result = await submitAccountDelete({ currentPassword: currentPassword });
        if (result) {
            setCurrentPassword("");
        }
    }

    const handleChangeNewEmail = (event) => {
        setNewEmail(event.target.value);
    };

    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
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
                    <form action="#" onSubmit={handleSubmitEmail}>
                        <EmailInputField email={newEmail} handleChangeEmail={handleChangeNewEmail} placeholder="New email" />
                        <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
                        <div className="input-field button">
                            <input type="submit" value="Change Email" />
                        </div>
                    </form>
                    <hr />
                    <h2>Change Password</h2>
                    <form action="#" onSubmit={handleSubmitPassword}>
                        <PasswordInputField password={newPassword} handleChangePassword={handleChangeNewPassword} placeholder="New password" />
                        <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
                        <div className="input-field button">
                            <input type="submit" value="Change Password" />
                        </div>
                    </form>
                    <hr />
                    <h2>Delete Account</h2>
                    <form action="#" onSubmit={handleDeleteAccount}>
                        <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
                        <div className="input-field button">
                            <input type="submit" value="Delete Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;