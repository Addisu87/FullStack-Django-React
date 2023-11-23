import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import Navbar from "./Navbar";

const Layout = (props) => {
  const { hasNavigationBack } = props;

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {hasNavigationBack && (
        <BsArrowLeftCircle
          className="mt-1 ml-2 text-cyan-500 text-lg font-medium"
          onClick={() => navigate(-1)}
        />
      )}

      <div className="container m-5">{props.children}</div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
