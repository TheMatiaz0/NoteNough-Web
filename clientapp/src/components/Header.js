import React from "react";
import {MdOutlineStickyNote2} from 'react-icons/md';

const Header = () => {
    return (
        <div className="header">
            <h1 className="logo">
                <a href="http://localhost:3000">
                    <div className="logo-container">
                        <div className="image-and-text">
                            <MdOutlineStickyNote2 className="primary-logo-span"/>
                            <span className="primary-logo-span">Note</span>
                        </div>
                        <span className="secondary-logo-span">Nough</span>
                    </div>
                </a>
            </h1>
        </div>
    )
}

export default Header;