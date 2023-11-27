import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authSlice from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(authSlice.actions.logoutUser());
    navigate("/login/");
  };

  return (
    <div className="navbar bg-cyan-500">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl text-white uppercase">
          Addblog
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              {user && user.avatar ? (
                <img src={user.avatar} alt="User Avatar" />
              ) : (
                <span>No Avatar</span>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/profile/${user?.id}/`}>Profile</Link>
            </li>
            <li>
              <a href="/login/" onClick={handleLogout}>
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
