import React from "react";
import { useNavigate } from "react-router-dom";
import { randomAvatar } from "../utils";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login/");
  };
  return (
    <div className="navbar bg-cyan-500">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Addgram
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              <img src={randomAvatar()} alt="Random Avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/profile/">Profile</a>
            </li>
            <li>
              <a href="/logout/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
