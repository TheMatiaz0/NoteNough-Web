/* import { Link } from "react-router-dom"; */

const SignUpButton = ({onClick}) => {
  return (
    <button onClick={onClick} className={`auth-button signup-btn`}  /* to="/signup" */>
      Sign up
    </button>
  );
};

export default SignUpButton;
