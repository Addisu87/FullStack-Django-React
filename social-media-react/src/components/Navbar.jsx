import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // Check if the user has scrolled beyond a certain threshold (e.g., 50px)
    const scrolled = window.scrollY > 20;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run this effect only once on mount

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login/");
    } catch (error) {
      toast.error("Logout failed.🔥");
    }
  };

  return (
    <div
      className={`navbar bg-cyan-500 ${
        isScrolled ? "fixed top-0 w-full z-50 transition-all duration-300" : ""
      }`}
    >
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl text-white uppercase">
          Addgram
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
              <Link to={"/login/"} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
