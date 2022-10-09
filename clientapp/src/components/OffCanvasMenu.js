const OffCanvasMenu = ({ content, isOpen, onClose }) => {
  let canvasWidth = "0";
  if (isOpen) {
    canvasWidth = window.innerWidth < 500 ? "100%" : "500px";
  }

  const overlayBackgroundColor = isOpen
    ? "rgba(0, 0, 0, 0.4)"
    : "rgba(0, 0, 0, 0)";
  const overlayPointerEvents = isOpen ? "all" : "none";

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: canvasWidth }}>
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
