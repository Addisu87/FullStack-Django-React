import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate(`/profile/${user.id}/`);
  };

  return (
    <div className="flex items-center space-y-0 space-x-6 mt-2 py-3 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg ">
      <img
        className="block mx-auto h-12 rounded-full sm:mx-0 sm:shrink-0"
        src={user?.avatar}
        alt="avatar"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-normal text-black font-medium">{user?.name}</p>
        </div>
        <button
          type="submit"
          onClick={handleNavigateProfile}
          className="px-4 py-1 text-sm text-cyan-500 font-semibold rounded-full border border-cyan-200 hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          See Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
