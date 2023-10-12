import React from "react";

const Toaster = (props) => {
  const { title, message, type } = props;

  return (
    <div className="w-32">
      <div className="toast toast-center toast-middle">
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
