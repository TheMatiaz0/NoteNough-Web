import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link className={`auth-button login-btn`} to="/login">
      Login
    </Link>
  );
};

export default LoginButton;
