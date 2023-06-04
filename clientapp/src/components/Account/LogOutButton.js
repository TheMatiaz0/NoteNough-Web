import "../Header.css";
import React from "react";
import { ImExit } from "react-icons/im";

const LogOutButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="auth-button login-btn"><span className="center"><ImExit className="arrow-break" size="1em" />Log out</span></button>
    );
};

export default LogOutButton;
