import React from "react";
import Layout from "../components/Layout";
import UpdateProfileForm from "../components/UpdateProfileForm";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const profileId = useParams();
  const profile = useSWR(`/user/${profileId}/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {profile.data ? (
        <div className="flex justify-evenly">
          <div className="w-3/4">
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
