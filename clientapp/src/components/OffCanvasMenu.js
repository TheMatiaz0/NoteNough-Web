import "react-modern-drawer/dist/index.css";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const OffCanvasMenu = ({ isOpen, onClose, handleOnSubmit }) => {
  let canvasWidth = "0";
  if (isOpen) {
    canvasWidth = window.innerWidth < 500 ? "100%" : "500px";
  }
  const overlayBackgroundColor = isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowingPassword, setShowingPassword] = useState(false);
  const [isRememberingPassword, setRememberingPassword] = useState(true);
  const toggleShowPassword = () => {
    setShowingPassword((prevState) => !prevState);
  };
  const toggleRememberPassword = () => {
    setRememberingPassword((prevState) => !prevState);
  };
  const ShowPasswordIcon = isShowingPassword ? IoMdEyeOff : IoMdEye;

  const handleSubmit = (event) => {
    event.preventDefault();

    /* Encrypt password here */
    setPassword("");
    setEmail("");

    // handleOnSubmit(email, password);
    // fetch notes on log in + should it save current notes too?
    // save current notes on register
    
    onClose();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const getSpecialKeysWarning = (event) => {
    var caps = event.getModifierState( 'CapsLock' );
    var num = event.getModifierState('NumLock');
    console.log(`Caps Lock: ${caps}`);
    console.log(`Num Lock: ${num}`);
  }

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: canvasWidth }}>
        <div className="form">
          <div className="form-header">
            <div className="form-info">
              <img className="logo" alt="logo" src="favicon.png" />
              <div className="auth-header">Welcome back 👋</div>
            </div>
            <span onClick={onClose} className="close">
              &times;
            </span>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your email"
                autoComplete="email"
                name="Enter your email to log in"
                onChange={handleChangeEmail}
                value={email}
                required
                onKeyUp={getSpecialKeysWarning}
                onClick={getSpecialKeysWarning}
              />
              <MdOutlineMail className="auth-icon" />
            </div>
            <div className="input-field">
              <input
                type={isShowingPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                name="Enter your password to log in"
                onChange={handleChangePassword}
                value={password}
                required
              />
              <MdLockOutline className="auth-icon" />
              <ShowPasswordIcon
                onClick={toggleShowPassword}
                className="auth-icon right-icon btn-icon"
              />
            </div>
            <div className="form-bottom">
              <div className="input-checkbox">
                <input
                  onClick={toggleRememberPassword}
                  type="checkbox"
                  id="remember"
                  value={isRememberingPassword}
                />
                <label htmlFor="remember" className="text">
                  Remember password
                </label>
              </div>
              <a href="forgot-password" className="text">
                Forgot password?
              </a>
            </div>
            <div className="input-field button">
              <input type="submit" value="Log in" />
            </div>
          </form>
        </div>
      </div>
      <div
        className="overlay"
        style={{
          backgroundColor: overlayBackgroundColor,
          pointerEvents: overlayPointerEvents,
        }}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default OffCanvasMenu;
