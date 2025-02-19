import "../Header.css";
import React from "react";

const NavigationButton = ({ onClick, text }) => {
    return (
        <a onClick={onClick} className="auth-button login-btn">{text}</a>
    );
};

export default NavigationButton;
