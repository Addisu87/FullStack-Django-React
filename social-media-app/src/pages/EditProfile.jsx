import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
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
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default EditProfile;
