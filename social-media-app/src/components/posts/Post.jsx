import React from "react";
import { format } from "timeago.js";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { SlLike } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { useSelector } from "react-redux";

const Post = (props) => {
  const { post, refresh } = props;
  const { user } = useSelector((state) => state.auth);

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
    <div className="flex flex-col py-8 px-4 max-w-3xl mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div class="group flex">
        <img
          class="shrink-0 h-12 w-12 rounded-full"
          src={randomAvatar()}
          alt="avatar"
        />
        <div class="ml-3">
          <p class="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            {post.author.name}
          </p>
          <p class="text-sm font-medium text-slate-500 group-hover:text-slate-700">
            {format(post.created)}
          </p>
        </div>
      </div>

      <div>
        <p className="mt-3 text-gray-700 text-sm">{post.body}</p>
      </div>

      <div className="mt-4">
        <div className="flex flex-row text-gray-700 text-sm mr-3">
          <SlLike
            onClick={() => {
              if (post.liked) {
                handleLikeClick("remove_like");
              } else {
                handleLikeClick("like");
              }
            }}
          />
          <span>{post.likes_count}</span>
          <p className="ms-1">
            <small>Like</small>
          </p>
        </div>
        <div className="flex flex-row text-gray-700 text-sm mr-8">
          <LiaComments
            onClick={() => {
              if (post.liked) {
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
  );
};

export default Post;
