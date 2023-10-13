import React from "react";
import { format } from "timeago.js";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { SlLike } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { getUser } from "../../hooks/user.actions";

const Post = (props) => {
  const { post, refresh } = props;
  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl my-4">
      <div className="flex items-start px-4 py-6">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src={randomAvatar()}
          alt="avatar"
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {post?.author?.name}
            </h2>
            <small className="text-sm text-gray-700">
              {format(post.created)}
            </small>
          </div>
          <p className="mt-3 text-gray-700 text-sm">{post?.body}</p>
          <div className="mt-4 flex items-center">
            <div className="flex flex-row text-gray-700 text-sm mr-3">
              <SlLike
                onClick={() => {
                  if (post?.liked) {
                    handleLikeClick("remove_like");
                  } else {
                    handleLikeClick("like");
                  }
                }}
              />
              <span>{post?.likes_count}</span>
              <p className="ms-1">
                <small>Like</small>
              </p>
            </div>
            <div className="flex flex-row text-gray-700 text-sm mr-8">
              <LiaComments
                onClick={() => {
                  if (post?.liked) {
                    handleLikeClick("remove_like");
                  } else {
                    handleLikeClick("like");
                  }
                }}
              />
              <span>{post.comments_count}</span>
              <p className="ms-1 mb-0">
                <small>Comment</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
