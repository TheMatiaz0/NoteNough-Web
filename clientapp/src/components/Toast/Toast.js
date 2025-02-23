import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const displayTime = 4000;
  const fadeOutTime = 500;

  useEffect(() => {
    if (message && message !== currentMessage) {
      setCurrentMessage(message);
      setIsVisible(true); 
    }
  }, [message, currentMessage]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, displayTime);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible && currentMessage) {
      const hideTimer = setTimeout(() => {
        onClose(); 
      }, fadeOutTime); 

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, currentMessage, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast">
      {currentMessage}
    </div>
  );
};

export default Toast;
