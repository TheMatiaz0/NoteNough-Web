import AuthForm from "./AuthForm"

const LoginForm = ({ onClose, handleOnSubmit, onLoginClick, onSignUpClick }) => {
    return (
        <div>
            <AuthForm canForgotPassword={true} buttonText="Continue" rememberPasswordText="Stay logged in" onClose={onClose} handleOnSubmit={handleOnSubmit} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} />
        </div>
    );
};

export default LoginForm;
