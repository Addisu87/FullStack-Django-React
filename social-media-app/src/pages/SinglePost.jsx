import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";

const SinglePost = () => {
  console.log(useParams());
  let { postId } = useParams();

  const post = useSWR(`/post/${postId}/`, fetcher);
  const comments = useSWR(`/post/${postId}/comment/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {post.data ? (
        <div className="relative flex flex-col py-2 px-2 max-w-3xl bg-gray-100 rounded-xl shadow-lg space-y-3 sm:space-x-6">
          <Post post={post.data} refresh={post.mutate} isSinglePost />

          {/* Adding CreateComment form and list all comments here */}
          <CreateComment postId={post.data.id} refresh={comments.mutate} />
          {comments.data &&
            comments.data.results.map((comment, index) => (
              <Comment
                key={index}
                postId={post.data.id}
                comment={comment}
                refresh={comments.mutate}
              />
            ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default SinglePost;
