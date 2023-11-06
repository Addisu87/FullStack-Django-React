import React from "react";
import Navbar from "./Navbar";
import Toaster from "./Toaster";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToaster } from "../redux/toasterSlice";

const Layout = (props) => {
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const { hasNavigationBack } = props;

  const showToast = (title, message, type) => {
    dispatch(
      setToaster({
        title: title,
        message: message,
        show: true,
        type: type,
      })
    );
  };

  return (
    <div>
      <Navbar />
      {hasNavigationBack && (
        <BsFillArrowLeftCircleFill
          className="mt-1 ml-2 text-cyan-500 text-lg font-medium"
          onClick={() => navigate(-1)}
        />
      )}

      <div className="container m-5">{props.children}</div>

      <Toaster />
    </div>
  );
};

export default Layout;
