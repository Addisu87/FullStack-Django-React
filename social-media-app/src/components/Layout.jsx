import React, { createContext, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Toaster from "./Toaster";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const Context = createContext("unknown");

const Layout = (props) => {
  const [toaster, setToaster] = useState({
    title: "",
    show: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);

  const { hasNavigationBack } = props;

  return (
    <Context.Provider value={value}>
      <div>
        <Navbar />
        {hasNavigationBack && (
          <BsFillArrowLeftCircleFill
            className="mt-1 ml-2 text-cyan-500 text-lg font-medium"
            onClick={() => navigate(-1)}
          />
        )}

        <div className="container m-5">{props.children}</div>
      </div>
      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={() => setToaster({ ...toaster, show: false })}
      />
    </Context.Provider>
  );
};

export default Layout;
