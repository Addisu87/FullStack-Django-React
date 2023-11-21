import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";

const SinglePost = () => {
  let { postId } = useParams();
  console.log(useParams());
  const post = useSWR(`/post/${postId}/`, fetcher);
  const comments = useSWR(`/post/${postId}/comment/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {post.data ? (
        <div className="flex justify-center">
          <div className="w-full sm:w-8/12 bg-gray-200 p-4 rounded-lg shadow-md">
            <Post post={post.data} refresh={post.mutate} isSinglePost />
            {/* Adding CreateComment form and list all comments here */}
            <CreateComment postId={post.data.id} refresh={comments.mutate} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default SinglePost;
