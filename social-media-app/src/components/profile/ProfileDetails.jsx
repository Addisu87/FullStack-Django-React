import React from "react";
import { Radio } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    <div>
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
    <div className="flex items-center space-y-0 space-x-6 mt-2 py-3 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg ">
      <img
        className="block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
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
