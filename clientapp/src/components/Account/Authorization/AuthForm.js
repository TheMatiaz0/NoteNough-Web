import { useState } from "react";
import SwitchFormButton from "../../Form/SwitchFormButton";
import EmailInputField from "../InputField/EmailInputField";
import PasswordInputField from "../InputField/PasswordInputField";
import HorizontalLoadingSpinner from "../../Loading/HorizontalLoadingSpinner";

const AuthForm = ({
  canForgotPassword,
  buttonText,
  rememberPasswordText,
  onClose,
  handleOnSubmit,
  onLoginClick,
  onSignUpClick,
  isLoading
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
        <EmailInputField 
          email={email} 
          handleChangeEmail={handleChangeEmail} 
          placeholder="Enter your email" 
          bright={true} />
        <PasswordInputField 
          password={password} 
          handleChangePassword={handleChangePassword} 
          placeholder="Enter your password" 
          canForgotPassword={canForgotPassword} 
          bright={true} />
        <div className="form-bottom">
          <div className="input-checkbox">
            <label className="text center">
              <input
                title="Ensures that you will be logged in after closing website"
                onClick={toggleRememberPassword}
                type="checkbox"
                defaultChecked={isRememberPassword}
              />
              <span className="disclaimer">{rememberPasswordText}</span>
            </label>
          </div>
        </div>
        <div className="input-field button dark-bg">
          <input type="submit" value={buttonText} />
        </div>
        {isLoading && <HorizontalLoadingSpinner />}
      </form>
    </div>
  );
};

export default AuthForm;
