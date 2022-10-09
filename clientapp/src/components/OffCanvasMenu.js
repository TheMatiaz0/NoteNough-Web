import "react-modern-drawer/dist/index.css";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {useState} from "react";

const OffCanvasMenu = ({ isOpen, onClose }) => {
  let canvasWidth = "0";
  if (isOpen) {
    canvasWidth = window.innerWidth < 500 ? "100vw" : "500px";
  }
  const backgroundClr = isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  const [isShowingPassword, setShowingPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowingPassword((prevState) => !prevState);
  };
  const ShowPassword = isShowingPassword ? IoMdEyeOff : IoMdEye

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: canvasWidth }}>
        <div className="form">
          <div className="form-header">
            <div className="form-info">
              <img className="logo" alt="logo" src="favicon.png" />
              <div className="auth-header">Welcome back</div>
            </div>
            <span onClick={onClose} className="close">&times;</span>
          </div>
          <form action="#">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your email"
                autoComplete="email"
                name="Enter your email to log in"
                required
              />
              <MdOutlineMail className="auth-icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                name="Enter your password to log in"
                required
              />
              <MdLockOutline className="auth-icon" />
              <ShowPassword onClick={toggleShowPassword} className="auth-icon right-icon btn-icon" />
            </div>
            <div className="form-bottom">
              <div className="input-checkbox">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text">
                  Remember password
                </label>
              </div>
              <a href="#" className="text">
                Forgot password?
              </a>
            </div>
            <div className="input-field button">
              <input type="submit" value="Log in" />
            </div>
          </form>
        </div>
      </div>
      <div
        className="overlay"
        style={{
          backgroundColor: backgroundClr,
          pointerEvents: overlayPointerEvents,
        }}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default OffCanvasMenu;
