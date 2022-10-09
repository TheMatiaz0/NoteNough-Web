import { MdOutlineMail, MdLockOutline, MdInfoOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const LoginForm = ({ onClose }) => {
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

  const [isCapsLocked, setCapsLocked] = useState(false);
  const [isNumLocked, setNumLocked] = useState(false);
  const getSpecialKeysWarning = (event) => {
    setCapsLocked(event.getModifierState("CapsLock"));
    setNumLocked(event.getModifierState("NumLock"));
  };
  return (
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
            maxLength="64"
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
            onKeyUp={getSpecialKeysWarning}
            onClick={getSpecialKeysWarning}
            maxLength="64"
          />
          <MdLockOutline className="auth-icon" />
          <ShowPasswordIcon
            onClick={toggleShowPassword}
            className="auth-icon right-icon btn-icon"
          />
        </div>
        <div className="password-tips">
          <p>
            Remember that your password contains at least <b>8 characters</b>.
          </p>
          {isCapsLocked && (
            <p>
              <MdInfoOutline size="1.2em" />
              Caps Lock is on
            </p>
          )}
          {isNumLocked && (
            <p>
              <MdInfoOutline size="1.2em" />
              Num Lock is on
            </p>
          )}
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
  );
};

export default LoginForm;
