import AuthForm from "./AuthForm"

const SignUpForm = ({ onClose, handleOnSubmit, onLoginClick, onSignUpClick }) => {

    return (
        <div>
            <AuthForm canForgotPassword={false} buttonText="Create account" rememberPasswordText="Remember password" onClose={onClose} handleOnSubmit={handleOnSubmit} onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} />
        </div>
    );
};

export default SignUpForm;
