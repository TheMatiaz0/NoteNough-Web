import AuthForm from "./AuthForm"

const LoginForm = ({ onClose, handleOnSubmit }) => {
    return (
        <div>
            <AuthForm title="Welcome again 👋" canForgotPassword={true} buttonText="Continue" rememberPasswordText="Stay logged in" onClose={onClose} handleOnSubmit={handleOnSubmit} />
        </div>
    );
};

export default LoginForm;
