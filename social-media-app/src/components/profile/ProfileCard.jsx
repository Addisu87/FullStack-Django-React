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
    <div className="flex w-3/4 items-center space-y-0 space-x-6 mt-2 py-1 px-1 max-w-sm mx-auto bg-white rounded-xl drop-shadow-md">
      <div className="items-center flex-col w-full h-full p-2 bg-cover">
        {/* Background and profile */}
        <div className="relative flex h-8 w-full justify-center rounded-xl bg-gradient-to-r from-green-300 to-cyan-500">
          <div className="dark:!border-navy-700 absolute -bottom-6 flex w-12 h-12 items-center justify-center rounded-full border-white bg-cyan-400">
            <img
              className="block mx-auto w-12 h-12 rounded-full sm:mx-0 sm:shrink-0"
              src={user?.avatar}
              alt="avatar"
            />
          </div>
        </div>

        {/* Name and position */}
        <div className="mt-8 flex flex-col items-center">
          <h4 className="text-navy-700 text-xl font-bold dark:text-white">
            <p className="text-base text-black font-normal">
              {user?.name && user.name.length > 8
                ? `${user.name.slice(0, 8)}...`
                : user.name}
            </p>
          </h4>

          <button
            type="submit"
            onClick={handleNavigateProfile}
            className="px-4 py-1 text-sm text-cyan-500 font-semibold rounded-full border border-cyan-200 hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
