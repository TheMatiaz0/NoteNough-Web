import { MdOutlineMail, MdLockOutline, MdInfoOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const AuthForm = ({ title, canForgotPassword, buttonText, rememberPasswordText, onClose, handleOnSubmit }) => {

  const [isShowingPassword, setShowingPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowingPassword((prevState) => !prevState);
  };
  const ShowPasswordIcon = isShowingPassword ? IoMdEyeOff : IoMdEye;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isRememberingPassword, setRememberingPassword] = useState(true);
  const toggleRememberPassword = () => {
    setRememberingPassword((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /* Encrypt password here */
    setPassword("");
    setEmail("");

    handleOnSubmit(email, password, isRememberingPassword);
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
          <div className="auth-header">{title}</div>
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
            {canForgotPassword ? `Remember that your password contains at least <b>8 characters</b>.` : `&times; - At least 8 characters.`}
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
              defaultChecked={isRememberingPassword}
            />
            <label htmlFor="remember" className="text">
              {rememberPasswordText}
            </label>
          </div>
          {canForgotPassword && <a href="forgot-password" className="text">
            Forgot password?
          </a>}
        </div>
        <div className="input-field button">
          <input type="submit" value={buttonText} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
