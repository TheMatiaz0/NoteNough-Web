import React from "react";
import Header from "../components/Header";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import CollapsibleFormHeader from "../components/CollapsibleFormHeader";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccountForm from "../components/DeleteAccountForm";
import "./AccountSettings.css";

const AccountSettings = (submitEmailChangeAsync, submitPasswordChange, submitAccountDelete) => {
    return (
        <div className="app-container">
            <Header />
            <div className="form">
                <Link to="/" className="auth-button login-btn">Go Back</Link>
                <LogOutButton />
                <h1>Account Settings</h1>
                <div>
                    <ul className="accordion-menu">
                        <CollapsibleFormHeader text="Change Email" content={<ChangeEmailForm onSubmitEmailAsync={submitEmailChangeAsync} />} />
                        <CollapsibleFormHeader text="Change Password" content={<ChangePasswordForm onSubmitPasswordChangeAsync={submitPasswordChange} />} />
                        <CollapsibleFormHeader text="Delete Account" content={<DeleteAccountForm onSubmitDeleteAccountAsync={submitAccountDelete} />} />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;