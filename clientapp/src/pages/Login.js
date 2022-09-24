import Header from '../components/Header'
import SignUpButton from '../components/SignUpButton'

const Login = () => {
    return (
        <div>
            <Header buttons={[<SignUpButton />]} />
            <p>Login!</p>
        </div>
    );
}

export default Login;