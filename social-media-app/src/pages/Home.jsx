import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import { getUser } from "../hooks/user.actions";
import { randomAvatar } from "../utils";

const Home = () => {
  const user = getUser();

  // if (!user) {
  //   return <div>Loading!</div>;
  // }

  return (
    <Layout>
      <div className="flex justify-center my-10">
        <div className="w-full sm:w-7/12 border rounded flex items-center p-4">
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
      </div>
    </Layout>
  );
};

export default Home;
