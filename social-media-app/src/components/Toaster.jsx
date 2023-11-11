import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToaster } from "../redux/toasterSlice";

function Toaster() {
  const toaster = useSelector((state) => state.toaster);
  const dispatch = useDispatch();

  const handleCloseToaster = () => {
    dispatch(hideToaster());
  };

  const bgColorClass =
    toaster.type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`toaster ${toaster.show ? "show" : ""}`}>
      <div
        className={`flex justify-center items-center toast ${toaster.type} ${bgColorClass}`}
      >
        <strong>{toaster.title}</strong> {toaster.message}
        <button className="close" onClick={handleCloseToaster}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toaster;
