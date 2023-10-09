import React from "react";

const Toaster = (props) => {
  const { showToast, title, message, onClose, type } = props;

  const handleClose = () => {
    console.log("Toaster closed");
    onClose();
  };

  return (
    <div className="w-32">
      <div className="toast toast-center toast-middle" onClose={handleClose}>
        <div>
          <strong>{title}</strong>
        </div>
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toaster;
