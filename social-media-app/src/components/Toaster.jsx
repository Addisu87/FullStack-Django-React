import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToaster } from "../redux/toasterSlice";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function Toaster() {
  const toaster = useSelector((state) => state.toaster);
  const dispatch = useDispatch();

  const handleCloseToaster = () => {
    dispatch(hideToaster());
  };

  const bgColorClass =
    toaster.type === "success" ? "bg-green-500" : "bg-red-500";
  console.log("Toaster Type:", toaster.type);

  return (
    <div
      className={`fixed top-14 left-1/2 transform -translate-x-1/2 items-center w-full max-w-xs p-4 text-white rounded-xl shadow-lg dark:text-gray-400 dark:bg-gray-800 ${bgColorClass} ${
        toaster.show ? "show" : ""
      }`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold">{toaster.title}</div>

        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={handleCloseToaster}
        >
          <AiOutlineClose className="w-3 h-3" />
        </button>
      </div>

      <div className="ms-3 text-sm font-normal">{toaster.message}</div>
    </div>
  );
}

export default Toaster;
