import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Radio } from "react-loader-spinner";
import Layout from "../components/Layout";
import { fetcher } from "../helpers/axios";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";

const EditProfile = () => {
  const { profileId } = useParams();
  const profile = useSWR(`/user/${profileId}/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {profile?.data ? (
        <div className="relative flex flex-col py-2 px-2 max-w-4xl bg-gray-50 rounded-xl shadow-lg space-y-3 sm:space-x-6">
          <UpdateProfileForm profile={profile.data} />
        </div>
      ) : (
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
        </div>
      )}
    </Layout>
  );
};

export default EditProfile;
