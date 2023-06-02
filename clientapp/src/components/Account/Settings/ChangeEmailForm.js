import React from "react";
import { useState } from "react";
import PasswordInputField from "../PasswordInputField";
import EmailInputField from "../EmailInputField";

const ChangeEmailForm = ({ onSubmitEmailAsync }) => {
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const handleChangeNewEmail = (event) => {
        setNewEmail(event.target.value);
    };

    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleSubmitChangeEmail = async (event) => {
        event.preventDefault();

        const result = await onSubmitEmailAsync({ newEmail: newEmail, currentPassword: currentPassword });
        if (result) {
            setCurrentPassword("");
            setNewEmail("");
        }
    };

    return (
        <form action="#" onSubmit={handleSubmitChangeEmail}>
            <EmailInputField email={newEmail} handleChangeEmail={handleChangeNewEmail} placeholder="New email" />
            <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
            <div className="input-field button">
                <input type="submit" value="Change Email" />
            </div>
        </form>
    );
}

export default ChangeEmailForm;