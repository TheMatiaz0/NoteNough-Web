import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <a href="/">
          <img alt="test" src="logo.png" />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a className="auth-button" href="/login">
              Login
            </a>
          </li>
          <li className="active">
            <a className="auth-button signup-btn" href="/signup">
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
