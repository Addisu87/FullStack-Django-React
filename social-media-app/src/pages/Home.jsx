import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };

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
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="w-full md:w-2/3 md:pr-4">
          {isMobile && profiles.data && (
            <Slider {...settings}>
              {profiles.data.results.map((profile, index) => (
                <ProfileCard key={index} user={profile} />
              ))}
            </Slider>
          )}

          <div className="flex items-center justify-center py-4 px-4 mb-2 max-w-4xl bg-white rounded-xl drop-shadow-md space-y-3 sm:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-12 rounded-full">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow pl-2">
              <CreatePost refresh={posts.mutate} />
            </div>
          </div>

          {posts.data?.results.map((post, index) => (
            <div key={index} className="w-full rounded mb-4 p-2">
              <Post key={index} post={post} refresh={posts.mutate} />
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 md:pl-4">
          {profiles.data && !isMobile && (
            <div className="w-full md:border rounded flex items-center p-2 mb-2">
              <div className="flex flex-col w-full mx-auto">
                <h4 className="font-semibold text-base text-center mb-2">
                  Suggested people
                </h4>
                {profiles.data.results.map((profile, index) => (
                  <ProfileCard key={index} user={profile} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </Layout>
  );
};

export default Home;
