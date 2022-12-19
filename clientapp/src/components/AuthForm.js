import { MdOutlineMail, MdLockOutline, MdInfoOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import SwitchFormButton from "./SwitchFormButton";

const AuthForm = ({
  canForgotPassword,
  buttonText,
  rememberPasswordText,
  onClose,
  handleOnSubmit,
  onLoginClick,
  onSignUpClick
}) => {
  const defaultRememberPassword = true;
  const [isShowingPassword, setShowingPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowingPassword((prevState) => !prevState);
  };
  const ShowPasswordIcon = isShowingPassword ? IoMdEyeOff : IoMdEye;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isRememberPassword, setRememberPassword] = useState(defaultRememberPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlName = canForgotPassword ? "login" : "register";
    const credentialsType = canForgotPassword ? "include" : "same-origin";
    const response = await fetch(`http://localhost:8080/api/auth/${urlName}`, {
      method: 'POST',
      credentials: credentialsType,
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: email,
          password: password,
          rememberMe: isRememberPassword
        }),
    })

    if (response.ok) {
      setPassword("");
      setEmail("");
      setRememberPassword(defaultRememberPassword);

      handleOnSubmit();

      onClose();
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const toggleRememberPassword = () => {
    setRememberPassword((prevState) => !prevState);
  };

  const [isCapsLocked, setCapsLocked] = useState(false);
  const [isNumLocked, setNumLocked] = useState(false);
  const getSpecialKeysWarning = (event) => {
    setCapsLocked(event.getModifierState("CapsLock"));
    setNumLocked(event.getModifierState("NumLock"));
  };

  return (
    <div className="form">
      <div className="form-header vert-align">
        <div className="form-info">
          <img className="logo" alt="logo" src="favicon.png" />
          <div className="auth-headers">
            <SwitchFormButton
              isActive={canForgotPassword}
              text="Log in to your account"
              onClick={onLoginClick} />
            <SwitchFormButton
              isActive={!canForgotPassword}
              text="Create an account"
              onClick={onSignUpClick} />
          </div>
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
            onChange={handleChangePassword}
            value={password}
            required
            onKeyUp={getSpecialKeysWarning}
            onClick={getSpecialKeysWarning}
            maxLength="64"
            minLength="8"
          />
          <MdLockOutline className="auth-icon" />
          <ShowPasswordIcon
            onClick={toggleShowPassword}
            className="auth-icon right-icon btn-icon"
          />
        </div>
        <div className="password-tips">
          {canForgotPassword ? (
            <p>
              Remember that your password contains at least{" "}
              <b>8 characters</b>.
            </p>
          ) : (
            <p>
              {password.length > 8 ? `✔️` : `❌`} - Password should have at least <b>8 characters</b>
              .
            </p>
          )}
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
            <label className="text">
              <input
                onClick={toggleRememberPassword}
                type="checkbox"
                defaultChecked={isRememberPassword}
              />
              {rememberPasswordText}
            </label>
          </div>
          {canForgotPassword && (
            <a href="forgot-password" className="text">
              Forgot password?
            </a>
          )}
        </div>
        <div className="input-field button">
          <input type="submit" value={buttonText} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
