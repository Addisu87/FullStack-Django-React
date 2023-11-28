import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";
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
        {loading && (
          <Radio
            visible={true}
            height={30}
            width={30}
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClassName="radio-wrapper"
            color="#1ff507"
          />
        )}
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex justify-evenly ">
        <div className="flex flex-col w-2/3 items-center my-3 space-y-4 pr-4">
          <div className="w-full drop-shadow-md border rounded flex items-center p-2">
            <div className="avatar online">
              <div className="flex-shrink-0">
                <div className="w-12 rounded-full">
                  <img
                    src={user.avatar}
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
            <div key={index} className="w-full rounded mb-4 p-2">
              <Post key={index} post={post} refresh={posts.mutate} />
            </div>
          ))}
        </div>

        <div className="flex flex-col w-1/3 items-center my-3 space-y-4 pl-4">
          <div className="w-full drop-shadow-md border rounded flex items-center p-2">
            <div className="flex flex-col mx-auto">
              <h4 className="font-semibold text-base text-center mb-2">
                Suggested people
              </h4>
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
