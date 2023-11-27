import React from "react";
import { randomAvatar } from "../../utils";

const ProfileDetails = (props) => {
  const { user } = props;

  return (
    <div className="flex items-center space-y-0 space-x-6 mt-2 py-3 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg ">
      <img
        className="block mx-auto h-12 rounded-full sm:mx-0 sm:shrink-0"
        src={randomAvatar()}
        alt="avatar"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p class="text-xl leading-tight">{user.name}</p>
          <p class="text-sm leading-tight text-gray-600">{user.bio} </p>
          <p class="text-sm leading-tight text-gray-600">{user.bio} </p>
        </div>
        <div class="mt-4">
          <button
            type="submit"
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
