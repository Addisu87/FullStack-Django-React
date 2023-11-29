import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import ProfileDetails from "../components/profile/ProfileDetails";
import Post from "../components/posts/Post";

const Profile = () => {
  const profileId = useParams();
  const user = useSWR(`/user/${profileId}/`, fetcher);
  const posts = useSWR(`/post/?author__public_id=${profileId}`, fetcher, {
    refreshInterval: 2000,
  });

  return (
    <Layout hasNavigationBack>
      <div className="relative flex flex-col py-2 px-2 max-w-4xl bg-gray-50 rounded-xl shadow-lg space-y-3 sm:space-x-6">
        <ProfileDetails user={user.data} />
        <div className="my-4">
          <div className="grid grid-cols-1 gap-4">
            {posts.data?.results.map((post, index) => (
              <Post key={index} post={post} refresh={posts.mutate} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
