import React from "react";
import { Radio } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    <div className="flex items-center justify-center h-full">
      <Radio
        visible={true}
        height={30}
        width={30}
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        wrapperClassName="radio-wrapper"
        color="#1ff507"
      />
    </div>;
  }

  return (
    <div className="relative flex justify-evenly max-w-sm py-3 px-3 bg-gray-50 rounded-xl shadow-lg space-y-3 sm:space-x-6 mx-auto">
      <img
        className="block h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={user?.avatar}
        alt="avatar"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-xl leading-tight">{user?.name}</p>
          <p className="text-sm leading-tight text-gray-600">
            {user?.bio ? user?.bio : "No bio."}
          </p>
          <p className="text-sm leading-tight text-gray-600">
            {user?.posts_count} posts
          </p>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            onClick={() => navigate(`/profile/${user?.id}/edit/`)}
            className="px-4 py-1 text-sm text-cyan-500 font-semibold rounded-full border border-cyan-200 hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
