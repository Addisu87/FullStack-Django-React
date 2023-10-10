import React from "react";

const Toaster = (props) => {
  const { showToast, title, message, onClose, type } = props;

  const handleClose = () => {
    console.log("Toaster closed");
    onClose();
  };

  return (
    <div className="w-32">
      <div
        className="toast toast-center toast-middle"
        show={showToast}
        onClose={handleClose}
        delay={3000}
      >
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
