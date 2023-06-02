import React from "react";
import { MdOutlineMail } from "react-icons/md";

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