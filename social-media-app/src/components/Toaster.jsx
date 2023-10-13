import React from "react";

function Toaster(props) {
  const { showToast, title, message, type, onClose } = props;

  return (
    <div className={`toaster ${showToast ? "show" : ""}`}>
      <div className={`toast ${type}`}>
        <strong>{title}</strong>: {message}
        <button className="close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toaster;
