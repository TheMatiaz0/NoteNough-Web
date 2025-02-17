const OffCanvasMenu = ({ content, isOpen, onClose }) => {
  const right = isOpen ? "0px" : "-600px";
  const overlayType = isOpen ? "overlay-active" : "overlay-deactive";

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ right: right }}>
        {content}
      </div>
      <div
        className={`overlay ${overlayType}`}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default OffCanvasMenu;
