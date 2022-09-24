import React from "react";
import { Link } from "react-router-dom";

const Header = ({buttons}) => {
  const rootRoute = "/";
  return (
    <div className="header">
      <div className="logo">
        <Link to={rootRoute}>
          <img alt="test" src="logo.png" />
        </Link>
      </div>
      <nav>
        <ul>
          {buttons.map((button, i) => (
            <li key={i}>
              {React.cloneElement(button)}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
