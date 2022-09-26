import Header from "../components/Header";
import AuthModal from "../components/AuthModal";
import SignUpButton from "../components/SignUpButton";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <Header buttons={[<SignUpButton />]} />
      <AuthModal />
    </div>
  );
};

export default Login;
