import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="container m-5">{props.children}</div>
    </div>
  );
};

export default Layout;
