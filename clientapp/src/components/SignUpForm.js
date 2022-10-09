import AuthForm from "./AuthForm"

const SignUpForm = ({ onClose, handleOnSubmit }) => {
    return (
        <div>
            <AuthForm title="Hello newcomer 🧑" canForgotPassword={false} buttonText="Create account" rememberPasswordText="Remember password" onClose={onClose} handleOnSubmit={handleOnSubmit} />
        </div>
    );
};

export default SignUpForm;
