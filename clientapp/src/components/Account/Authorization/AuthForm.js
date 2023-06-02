import { useState } from "react";
import SwitchFormButton from "../SwitchFormButton";
import EmailInputField from "../EmailInputField";
import PasswordInputField from "../PasswordInputField";

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

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isRememberPassword, setRememberPassword] = useState(defaultRememberPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await handleOnSubmit({ isLoggingIn: canForgotPassword, email: email, password: password, isRememberPassword: isRememberPassword });
    if (result) {
      setPassword("");
      setEmail("");
      setRememberPassword(defaultRememberPassword);

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
        <EmailInputField email={email} handleChangeEmail={handleChangeEmail} placeholder="Enter your email" />
        <PasswordInputField password={password} handleChangePassword={handleChangePassword} placeholder="Enter your password" canForgotPassword={canForgotPassword} />
        <div className="form-bottom">
          <div className="input-checkbox">
            <label className="text center">
              <input
                onClick={toggleRememberPassword}
                type="checkbox"
                defaultChecked={isRememberPassword}
              />
              <span className="disclaimer">{rememberPasswordText}</span>
            </label>
          </div>
          {canForgotPassword && (
            <a href="/reset-password" className="text">
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
