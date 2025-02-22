import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const CollapsibleFormHeader = ({ text, content, onClick, isSelected }) => {
    return (
        <li className="link">
            <div onClick={onClick} className="accordion">
                <h2 className="center">{text} {isSelected ? <FiChevronRight className="arrow-break arrow-expandable" size="0.8em" /> : <FiChevronDown className="arrow-break arrow-expandable" size="0.8em" />}</h2>
                {isSelected && <div onClick={(e) => e.stopPropagation()} className="content">{content}</div>}
            </div>
        </li>
    );
}

export default CollapsibleFormHeader;