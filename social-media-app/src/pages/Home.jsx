import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { randomAvatar } from "../utils";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profile/ProfileCard";

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  const posts = useSWR("/post/", fetcher, {
    refreshInterval: 20000,
  });

  const profiles = useSWR("/user/?limit=5", fetcher, {
    refreshInterval: 20000,
  });

  if (!user) {
    return (
      <div>
        <p>{loading}</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex space-x-6">
        <div className="flex flex-col w-2/3 items-center my-3 space-y-4">
          <div className="w-full border rounded flex items-center p-4">
            <div className="avatar online">
              <div className="flex-shrink-0">
                <div className="w-12 rounded-full">
                  <img
                    src={randomAvatar()}
                    alt="User Avatar"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow pl-4">
              <CreatePost refresh={posts.mutate} />
            </div>
          </div>

          {posts.data?.results.map((post, index) => (
            <div key={index} className="w-full border rounded mb-4 p-2">
              <Post key={index} post={post} refresh={posts.mutate} />
            </div>
          ))}
        </div>

        <div className="flex flex-col w-1/3 items-center my-3 space-y-4">
          <div className="w-full border rounded flex items-center p-4">
            <div className="flex flex-col">
              {profiles.data &&
                profiles.data.results.map((profile, index) => (
                  <ProfileCard key={index} user={profile} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </Layout>
  );
};

export default Home;
