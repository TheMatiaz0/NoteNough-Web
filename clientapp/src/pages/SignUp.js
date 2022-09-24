import Header from '../components/Header';
import LoginButton from '../components/LoginButton';

const SignUp = () => {
    return (
        <div>
            <Header buttons={[<LoginButton />]} />
            <p>Sign up!</p>
        </div>
    );
}

export default SignUp;