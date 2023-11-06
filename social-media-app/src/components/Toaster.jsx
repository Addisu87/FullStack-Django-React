import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToaster } from "../redux/toasterSlice";

function Toaster() {
  const toaster = useSelector((state) => state.toaster);
  const dispatch = useDispatch();

  return (
    <div className={`toaster ${toaster.show ? "show" : ""}`}>
      <div className={`toast ${toaster.type}`}>
        <strong>{toaster.title}</strong>: {toaster.message}
        <button className="close" onClick={() => dispatch(hideToaster())}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toaster;
