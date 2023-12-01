import React from "react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaComments, FaRegComments } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import axiosService from "../../helpers/axios";
import UpdatePost from "./UpdatePost";

const Post = (props) => {
  const { post, refresh, isSinglePost } = props;
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

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}`)
      .then(() => {
        toast.success("Post deleted 🚀");
        refresh();
      })
      .catch(() => {
        toast.error("An error occurred.");
      });
  };

  return (
    <div
      data-testid="post-test"
      className="relative flex flex-col py-4 px-4 max-w-4xl bg-white rounded-xl shadow-lg space-y-3 sm:space-x-6"
    >
      <div className="group flex">
        <img
          className="shrink-0 h-12 w-12 rounded-full"
          src={post.author.avatar}
          alt="avatar"
        />
        <div className="ml-3">
          <p className="text-normal text-black font-medium">
            {post.author.name}
          </p>
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
            {format(post.created)}
          </p>
        </div>
      </div>

      <div>
        <p className="mt-2 text-gray-700 text-sm">{post.body}</p>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-row text-gray-700 text-sm mr-3 items-center">
          <BiSolidLike className="text-cyan-500 w-4 h-4" />
          <span className="ml-2">
            <small>{post.likes_count}Likes</small>
          </span>

          <div className="flex flex-row ml-3 items-center justify-center">
            {!isSinglePost && (
              <>
                <FaComments className="text-cyan-500 w-4 h-4" />
                <Link to={`/post/${post.id}`}>
                  <span className="ml-2">
                    <small>{post.comments_count} Comments</small>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-row text-gray-700 text-sm mr-8 items-center justify-center">
          <BiLike
            className="w-4 h-4"
            onClick={() => {
              if (post.liked) {
                handleLikeClick("remove_like");
              } else {
                handleLikeClick("like");
              }
            }}
          />
          <span className="ml-2">
            <small>Like</small>
          </span>

          {!isSinglePost && (
            <div className="flex flex-row items-center ml-4">
              <FaRegComments
                className="w-4 h-4"
                onClick={() => {
                  if (post.liked) {
                    handleLikeClick("remove_like");
                  } else {
                    handleLikeClick("like");
                  }
                }}
              />
              <Link to={`/post/${post.id}`}>
                <span className="ml-2">
                  <small>Comment</small>
                </span>
              </Link>
            </div>
          )}
        </div>

        {user.name === post.author.name && (
          <div className="absolute top-0 right-0">
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="inline-flex w-full rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <BsThreeDotsVertical
                    className="ml-2 -mr-1 h-5 w-5 text-cyan-400 hover:text-cyan-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <UpdatePost post={post} refresh={refresh} />
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-cyan-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={handleDelete}
                      >
                        <AiFillDelete
                          className={`${
                            active ? "text-white" : "text-gray-900"
                          } mr-2 h-5 w-5`}
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
