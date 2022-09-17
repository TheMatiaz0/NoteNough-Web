import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <a href="/">
          <img alt="test" src="logo.png" />
        </a>
      </div>
      <div>
        <a className="auth-button" href="/login">
          Login
        </a>
        <a className="auth-button signup-btn" href="/signup">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Header;
