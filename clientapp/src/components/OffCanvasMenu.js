import "react-modern-drawer/dist/index.css";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";

const OffCanvasMenu = ({ isOpen, onClose }) => {
  const canvasWidth = isOpen ? "600px" : "0";
  const canvasMarginRight = isOpen ? "0" : "600px";
  const backgroundClr = isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  return (
    <div>
      <div
        id="mySidenav"
        className="sidenav"
        style={{ width: canvasWidth, marginRight: canvasMarginRight }}
      >
        <div className="form">
          <div className="form-info">
            <img className="logo" alt="logo" src="favicon.png" />
            <div className="auth-header">Login</div>
          </div>
          <form action="#">
            <div className="input-field">
              <MdOutlineMail className="auth-icon" size="1.5em" />
              <input type="text" autoComplete="email" required />
            </div>
            <div className="input-field">
              <MdLockOutline className="auth-icon" size="1.5em" />
              <input type="password" autoComplete="current-password" required />
            </div>
            <input type="checkbox" name="remember" />
            <label htmlFor="remember">Remember password</label>
            <input className="auth-button" type="submit" />
          </form>
        </div>
      </div>
      <div className="overlay" style={{backgroundColor: backgroundClr, pointerEvents: overlayPointerEvents}} onClick={onClose}></div>
    </div>
  );
};

export default OffCanvasMenu;
