const OffCanvasMenu = ({ content, isOpen, onClose }) => {
  let right;
  let overlayType;

  right = isOpen ? "0px" : "-510px"

  overlayType = isOpen ? "overlay-active" : "overlay-deactive"

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
