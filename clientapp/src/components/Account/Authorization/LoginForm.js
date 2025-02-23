import AuthForm from "./AuthForm"

const LoginForm = ({ onClose, handleOnSubmit, onLoginClick, onSignUpClick, isLoading }) => {
    return (
        <div>
            <AuthForm canForgotPassword={true} buttonText="Continue" rememberPasswordText="Stay logged in (uses cookies)" onClose={onClose} handleOnSubmit={handleOnSubmit} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} isLoading={isLoading} />
        </div>
    );
};

export default LoginForm;
