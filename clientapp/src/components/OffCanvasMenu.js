const OffCanvasMenu = ({ content, isOpen, onClose }) => {
  let right;
  if (isOpen) {
    right = isOpen ? "0px" : "-510px"
  }

  const overlayBackgroundColor = isOpen
    ? "rgba(0, 0, 0, 0.4)"
    : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ right: right }}>
        {content}
      </div>
      <div
        className="overlay"
        style={{
          backgroundColor: overlayBackgroundColor,
          pointerEvents: overlayPointerEvents,
        }}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default OffCanvasMenu;
