import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ buttons }) => {
  const rootRoute = "/";
  return (
    <header>
      <div className="logo">
        <Link to={rootRoute}>
          <img alt="test" src="logo.png" />
        </Link>
      </div>
      <nav>
        <ul>
          {buttons.map((button, i) => (
            <li key={i}>{React.cloneElement(button)}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
