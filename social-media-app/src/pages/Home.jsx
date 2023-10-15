import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { randomAvatar } from "../utils";
import { fetcher } from "../helpers/axios";

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  const posts = useSWR("/post/", fetcher, {
    refreshInterval: 1000,
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
      <div className="flex flex-col w-2/3 items-center my-10 space-y-4">
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
            <CreatePost />
          </div>
        </div>

        {posts.data?.results.map((post, index) => (
          <div key={index} className="w-full border rounded mb-4 p-2">
            <Post key={index} post={post} refresh={posts.mutate} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
