import React from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { getUser } from "../hooks/user.actions";
import { randomAvatar } from "../utils";
import { fetcher } from "../helpers/axios";

const Home = () => {
  const user = getUser();

  const posts = useSWR("/post/", fetcher, {
    refreshInterval: 1000,
  });

  // if (!user) {
  //   return <div>Loading!</div>;
  // }

  return (
    <Layout>
      <div className="flex w-2/3 justify-between my-10">
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

        <div className="my-4">
          {posts.data?.results.map((post, index) => (
            <Post key={index} post={post} refresh={posts.mutate} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
