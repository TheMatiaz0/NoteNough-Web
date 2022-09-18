import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img alt="test" src="logo.png" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link className="auth-button" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="auth-button signup-btn" to="/signup">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
