import "./AuthModal.css";

const AuthModal = () => {
  return (
    <div className="auth-form">
      <div className="form">
        <div>&times;</div>
        <div className="form-info">
          <h1>Login</h1>
          <p>Enter your login details to get into your account.</p>
        </div>
        <form action="#">
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
