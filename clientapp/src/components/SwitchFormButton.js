import React from "react";
import { MdArrowForward } from "react-icons/md";

const SwitchFormButton = ({ isActive, text, onClick }) => {
    return (
        isActive ? (
            <div className="b1 auth-header">
                <MdArrowForward className="arrow-break" />
                <h3 className="b1">{text}</h3>
            </div>) :
            (<button onClick={onClick} className="b1 auth-header inactive-header">
                {text}
            </button>)
    );
};

export default SwitchFormButton;
