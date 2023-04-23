import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import CollapsibleFormHeader from "../components/CollapsibleFormHeader";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccountForm from "../components/DeleteAccountForm";
import "../components/Header.css";
import "./AccountSettings.css";
import { MdKeyboardBackspace } from "react-icons/md";

const AccountSettings = (submitEmailChangeAsync, submitPasswordChange, submitAccountDelete) => {
    const [selected, setSelected] = useState(null);

    const toggle = id => () => setSelected(
        selected => selected === id ? null : id,
    );

    return (
        <div className="app-container">
            <Header />
            <div className="form">
                <Link style={{ textDecoration: 'none' }} className="auth-button login-btn" to="/">
                    <MdKeyboardBackspace className="arrow-break" size="1em" />Go Back
                </Link>
                <h1>Account Settings</h1>
                <div>
                    <ul className="accordion-menu">
                        <CollapsibleFormHeader onClick={toggle(0)} isSelected={selected === 0} text="Change Email" content={<ChangeEmailForm onSubmitEmailAsync={submitEmailChangeAsync} />} />
                        <CollapsibleFormHeader onClick={toggle(1)} isSelected={selected === 1} text="Change Password" content={<ChangePasswordForm onSubmitPasswordChangeAsync={submitPasswordChange} />} />
                        <CollapsibleFormHeader onClick={toggle(2)} isSelected={selected === 2} text="Delete Account" content={<DeleteAccountForm onSubmitDeleteAccountAsync={submitAccountDelete} />} />
                    </ul>
                    <LogOutButton />
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;