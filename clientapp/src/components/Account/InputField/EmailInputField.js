import React from "react";
import { MdOutlineMail } from "react-icons/md";

const EmailInputField = ({ email, handleChangeEmail, placeholder, bright }) => {
  return (
    <div className={`input-field ${bright ? "dark-bg" : "bright-bg"}`}>
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="email"
        onChange={handleChangeEmail}
        value={email}
        required
        maxLength="100"
      />
      <MdOutlineMail className="auth-icon" />
    </div>
  );
};

export default EmailInputField;