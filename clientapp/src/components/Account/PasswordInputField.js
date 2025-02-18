import React from "react";
import { useState } from "react";
import { MdInfoOutline, MdLockOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { BsCapslockFill } from "react-icons/bs"

const PasswordInputField = ({ password, handleChangePassword, placeholder, canForgotPassword }) => {
    const [isShowingPassword, setShowingPassword] = useState(false);
    const [isCapsLocked, setCapsLocked] = useState(false);

    const ShowPasswordIcon = isShowingPassword ? IoMdEyeOff : IoMdEye;

    const toggleShowPassword = () => {
        setShowingPassword((prevState) => !prevState);
    };

    const getSpecialKeysWarning = (event) => {
        setCapsLocked(event.getModifierState("CapsLock"));
    };

    return (
        <div>
            <div className="input-field">
                <input
                    type={isShowingPassword ? "text" : "password"}
                    placeholder={placeholder}
                    autoComplete="current-password"
                    onChange={handleChangePassword}
                    value={password}
                    required
                    onKeyUp={getSpecialKeysWarning}
                    onClick={getSpecialKeysWarning}
                    maxLength="64"
                    minLength="8"
                />
                <MdLockOutline className="auth-icon" />
                <div className="icon-container">
                    <ShowPasswordIcon
                        title="Show password"
                        onClick={toggleShowPassword}
                        className="btn-icon"
                    />
                    {isCapsLocked && <BsCapslockFill title="Caps Lock is ON" size="0.8em"/>}
                </div>

            </div>
            <div className="disclaimer form-bottom">
                {canForgotPassword ? (
                    <p>
                        Make sure that your password contains at least{" "}
                        <b>8 characters</b>.
                    </p>
                ) : (
                    <p className="password-tips">
                        {password.length >= 8 ? `✔️` : `❌`} Password should have at least <b>8 characters</b>
                        .
                    </p>
                )}
            </div>
        </div>
    );
};

export default PasswordInputField;