import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <Link className={`auth-button signup-btn`} to="/signup">
      Sign up
    </Link>
  );
};

export default SignUpButton;
