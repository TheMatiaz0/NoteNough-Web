import AuthForm from "./AuthForm"

const SignUpForm = ({ onClose, handleOnSubmit, onLoginClick, onSignUpClick }) => {

    return (
        <div>
            <AuthForm canForgotPassword={false} buttonText="Continue" rememberPasswordText="Remember password (uses cookies)" onClose={onClose} handleOnSubmit={handleOnSubmit} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} />
        </div>
    );
};

export default SignUpForm;
