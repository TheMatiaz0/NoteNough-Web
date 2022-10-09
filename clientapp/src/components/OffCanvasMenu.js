import "react-modern-drawer/dist/index.css";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

const OffCanvasMenu = ({ isOpen, onClose }) => {
  const canvasWidth = isOpen ? "500px" : "0";
  const canvasMarginLeft = isOpen ? "0" : "500px";
  const backgroundClr = isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  return (
    <div>
      <div
        id="mySidenav"
        className="sidenav"
        style={{ width: canvasWidth, marginLeft: canvasMarginLeft }}
      >
        <div className="form">
          <div className="form-info">
            <img className="logo" alt="logo" src="favicon.png" />
            <div className="auth-header">Welcome back</div>
          </div>
          <form action="#">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <MdOutlineMail className="auth-icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <MdLockOutline className="auth-icon" />
              <IoMdEye />
            </div>
            <div className="input-checkbox">
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Remember password</label>
            </div>
            <input className="auth-button" type="submit" value="Log in" />
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
