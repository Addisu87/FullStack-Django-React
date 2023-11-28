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
        <div className="flex justify-evenly">
          <div className="w-1/2">
            <UpdateProfileForm profile={profile.data} />
          </div>
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
