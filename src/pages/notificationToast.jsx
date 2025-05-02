import React, { useEffect } from "react";
import { XCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import "../styles/notificationToast.css";

const Toast = ({ 
  message, 
  show, 
  type = "info", 
  duration = 3000,
  onClose 
}) => {
  useEffect(() => {
    if (show && duration !== null) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} className="toast-icon" />;
      case "error":
        return <XCircle size={18} className="toast-icon" />;
      case "warning":
        return <AlertTriangle size={18} className="toast-icon" />;
      default:
        return <Info size={18} className="toast-icon" />;
    }
  };

  return (
    <div className={`toast ${type} ${show ? "show" : ""}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
      </div>
      {onClose && (
        <button className="toast-close" onClick={onClose}>
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;