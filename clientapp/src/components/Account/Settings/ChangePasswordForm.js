import React from "react";
import { useState } from "react";
import PasswordInputField from "../InputField/PasswordInputField";

const ChangePasswordForm = ({ onSubmitPasswordChangeAsync }) => {
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const handleSubmitPassword = async (event) => {
        event.preventDefault();

        const result = await onSubmitPasswordChangeAsync({ newPassword: newPassword, currentPassword: currentPassword });
        if (result) {
            setNewPassword("");
            setCurrentPassword("");
        }
    }

    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    };

    return (
        <form action="#" onSubmit={handleSubmitPassword}>
            <PasswordInputField password={newPassword} handleChangePassword={handleChangeNewPassword} placeholder="New password" />
            <PasswordInputField password={currentPassword} handleChangePassword={handleChangeCurrentPassword} placeholder="Current password" canForgotPassword={true} />
            <div className="input-field button">
                <input type="submit" value="Change Password" />
            </div>
        </form>
    );
}

export default ChangePasswordForm;