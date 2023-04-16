import React from "react";
import { FiChevronDown } from "react-icons/fi";

const CollapsibleFormHeader = ({ text, content, onClick, isSelected }) => {
    return (
        <li className="link" onClick={onClick}>
            <div className="dropdown">
                <h2 className="center">{text} <FiChevronDown className="arrow-break arrow-expandable" size="0.8em" /></h2>
                {isSelected && <div className="content">{content}</div>}
            </div>
        </li>
    );
}

export default CollapsibleFormHeader;