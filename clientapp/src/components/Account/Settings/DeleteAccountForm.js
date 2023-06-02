import React from "react";
import { useState } from "react";
import PasswordInputField from "../PasswordInputField";

const DeleteAccountForm = ({ onSubmitDeleteAccountAsync }) => {
    const [currentPassword, setCurrentPassword] = useState("");

    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleDeleteAccount = async (event) => {
        event.preventDefault();

        const result = await onSubmitDeleteAccountAsync({ currentPassword: currentPassword });
        if (result) {
            setCurrentPassword("");
        }
    }

    return (
        <form action="#" onSubmit={handleDeleteAccount}>
            <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
            <div className="input-field button">
                <input type="submit" value="Delete Account" />
            </div>
        </form>
    );
}

export default DeleteAccountForm;