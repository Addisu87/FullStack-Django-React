import React, { Fragment } from "react";
import { format } from "timeago.js";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { SlLike } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import Toaster from "../Toaster";
import UpdatePost from "./UpdatePost";
import { setToaster } from "../../redux/toasterSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Post = (props) => {
  const { post, refresh } = props;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { toaster } = useSelector((state) => state.toaster);

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
        dispatch(setToaster());
        refresh();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="relative flex flex-col py-8 px-4 max-w-3xl bg-white rounded-xl shadow-lg space-y-2 sm:py-2 sm:space-y-0 sm:space-x-6">
        <div className="group flex">
          <img
            className="shrink-0 h-12 w-12 rounded-full"
            src={randomAvatar()}
            alt="avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
              {post.author.username}
            </p>
            <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
              {format(post.created)}
            </p>
          </div>
        </div>

        <div>
          <p className="mt-3 text-gray-700 text-sm">{post.body}</p>
        </div>

        <div className="mt-4 flex flex-row">
          <div className="flex flex-row text-gray-700 text-sm mr-3 items-center">
            <SlLike
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like");
                } else {
                  handleLikeClick("like");
                }
              }}
            />
            <span className="ml-2">{post.likes_count}</span>
            <p className="ms-1">
              <small>Like</small>
            </p>
          </div>
          <div className="flex flex-row text-gray-700 text-sm mr-8 items-center">
            <LiaComments
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like");
                } else {
                  handleLikeClick("like");
                }
              }}
            />
            <span className="ml-2">{post.comments_count}</span>
            <p className="ms-1 mb-0">
              <small>Comment</small>
            </p>
          </div>
          {user.name === post.author.name && (
            <div className="absolute top-0 right-0">
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button className="inline-flex w-full rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    <BsThreeDotsVertical
                      className="ml-2 -mr-1 h-5 w-5 text-black hover:text-cyan-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-cyan-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <AiFillEdit
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-cyan-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <AiFillDelete
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                            onClick={handleDelete}
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

      <Toaster
        title="Success!"
        message="Post deleted 🚀"
        type="danger"
        show={toaster}
      />
    </>
  );
};

export default Post;
