import React from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import CollapsibleFormHeader from "../components/Header/CollapsibleFormHeader";
import ChangeEmailForm from "../components/Account/Settings/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/Settings/ChangePasswordForm";
import DeleteAccountForm from "../components/Account/Settings/DeleteAccountForm";
import "../components/Header/Header.css"
import "./AccountSettings.css";
import { MdKeyboardBackspace } from "react-icons/md";
import NavigationButton from "../components/Header/NavigationButton";

const AccountSettings = ({submitEmailChange, submitPasswordChange, submitAccountDelete, onLogoutClick}) => {
    const [selected, setSelected] = useState(null);

    const toggle = id => () => {
        setSelected(selected => selected === id ? null : id);
    };

    return (
        <div className="app-container">
            <Header />
            <div className="form">
                <Link style={{ textDecoration: 'none' }} className="back-btn auth-button" to="/">
                    <MdKeyboardBackspace className="arrow-break" size="1em" />Go Back
                </Link>
                <h1>Account Settings</h1>
                <div>
                    <ul className="accordion-menu">
                        <CollapsibleFormHeader 
                            onClick={toggle(0)} 
                            isSelected={selected === 0} 
                            text="Change Email" 
                            content={<ChangeEmailForm onSubmitEmailAsync={submitEmailChange} />} />
                        <CollapsibleFormHeader 
                            onClick={toggle(1)} 
                            isSelected={selected === 1} 
                            text="Change Password" 
                            content={<ChangePasswordForm onSubmitPasswordChangeAsync={submitPasswordChange} />} />
                        <CollapsibleFormHeader 
                            onClick={toggle(2)} 
                            isSelected={selected === 2} 
                            text="Delete Account" 
                            content={<DeleteAccountForm onSubmitDeleteAccountAsync={submitAccountDelete} />} />
                    </ul>
                    <div className="button-wrapper">
                        <NavigationButton onClick={onLogoutClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;