import React from "react";
import { format } from "timeago.js";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { toast } from "react-toastify";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import UpdateComment from "./UpdateComment";
import { BiLike, BiSolidLike } from "react-icons/bi";

const Comment = (props) => {
  const { postId, comment, refresh } = props;
  const { user } = useSelector((state) => state.auth);

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${postId}/comment/${comment.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDelete = () => {
    axiosService
      .delete(`/post/${postId}/comment/${comment.id}/`)
      .then(() => {
        toast.success("comment deleted 🚀");
        refresh();
      })
      .catch(() => {
        toast.error("An error occurred.");
      });
  };

  return (
    <div className="relative flex flex-col py-8 px-4 max-w-3xl bg-white rounded-xl shadow-lg space-y-2 sm:py-2 sm:space-y-0 sm:space-x-6">
      <div className="group flex">
        <img
          className="shrink-0 h-12 w-12 rounded-full"
          src={randomAvatar()}
          alt="avatar"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            {comment.author.name}
          </p>
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
            {format(comment.created)}
          </p>
        </div>
      </div>

      {user.name === comment.author.name && (
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
              <UpdateComment
                comment={comment}
                refresh={refresh}
                postId={postId}
              />
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
                        className="mr-2 h-5 w-5"
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

      <div>
        <p className="mt-3 text-gray-700 text-sm">{comment.body}</p>
      </div>

      <BiSolidLike className="text-cyan-500 w-4 h-4" />
      <span className="ml-2">
        <p className="space-x-2">{comment.likes_count} Likes</p>
      </span>

      <div className="mt-4 flex flex-row">
        <div className="flex flex-row text-gray-700 text-sm mr-3 items-center">
          <BiLike
            className="text-cyan-500 w-4 h-4"
            onClick={() => {
              if (comment.liked) {
                handleLikeClick("remove_like");
              } else {
                handleLikeClick("like");
              }
            }}
          />
          <span className="ml-2">
            <p>Like</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
