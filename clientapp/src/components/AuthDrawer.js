import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "./AuthDrawer.css";

const AuthDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer
      className="auth-form"
      open={isOpen}
      onClose={onClose}
      direction="bottom"
      size="40vh"
    >
      <div className="form">
        <div className="form-info">
          <img className="logo" alt="logo" src="favicon.png" />
          <h1>Login</h1>
        </div>
        <form action="#">
          <input type="text" required />
          <input type="password" required />
          <input type="checkbox" name="remember"/>
          <label for="remember">Remember password</label>
          <input className="auth-button" type="submit" />
        </form>
      </div>
    </Drawer>
  );
};

export default AuthDrawer;
