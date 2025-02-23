import "../../index.css";

const SidePopupMenu = ({ content, isOpen, onClose, isLoading }) => {
  const right = isOpen ? "0px" : "-600px";
  const overlayType = isOpen ? "overlay-active" : "overlay-deactive";

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ right: right }}>
        {content}
      </div>
      <div
        className={`overlay ${overlayType} ${isLoading ? "waiting" : ""}`}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default SidePopupMenu;
