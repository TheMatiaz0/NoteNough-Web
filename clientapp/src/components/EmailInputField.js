import React from "react";
import Header from "./Header";
import LogOutButton from "./LogOutButton";
import { Link } from "react-router-dom";

import { MdInfoOutline, MdLockOutline, MdOutlineMail } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const EmailInputField = ({ email, handleChangeEmail, placeholder }) => {
  return (
    <div className="input-field">
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="email"
        onChange={handleChangeEmail}
        value={email}
        required
        maxLength="64"
      />
      <MdOutlineMail className="auth-icon" />
    </div>
  );
};

export default EmailInputField;