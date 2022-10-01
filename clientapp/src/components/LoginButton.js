/* import { Link } from "react-router-dom"; */

const LoginButton = ({onClick}) => {
  return (
    <button onClick={onClick} className={`auth-button login-btn`} /* to="/login" */>
      Login
    </button>
  );
};

export default LoginButton;
