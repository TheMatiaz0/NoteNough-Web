import React from "react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const CollapsibleFormHeader = ({ text, content }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <li className="link">
            <div className="dropdown">
                <h2 className="center">{text} <FiChevronDown className="arrow-break arrow-expandable" size="0.8em" /></h2>
                <div className="content">{content}</div>
            </div>
        </li>
    );
}

export default CollapsibleFormHeader;