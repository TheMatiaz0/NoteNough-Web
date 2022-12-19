import "./Header.css";
import React from "react";
import {ImExit} from "react-icons/im";

const LogOutButton = ({ onClick }) => {
    const rootRoute = "/";
    return (
        <button onClick={onClick} className={`auth-button login-btn`}><ImExit className="arrow-break" size="1em" />Log out</button>
    );
};

export default LogOutButton;
