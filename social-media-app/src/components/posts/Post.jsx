import React, { useState } from "react";
import { format } from "timeago.js";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import Toaster from "../Toaster";
import UpdatePost from "./UpdatePost";

const Post = (props) => {
  const [showToast, setShowToast] = useState(false);
  const { post, refresh } = props;
  const { user } = useSelector((state) => state.auth);

  const MoreToggleIcon = React.forwardRef(({ onClick }, ref) => (
    <Link
      to="#"
      href={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDotsVertical className="text-gray-500" />
    </Link>
  ));

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
        setShowToast(true);
        refresh();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="flex flex-col py-8 px-4 max-w-3xl bg-white rounded-xl shadow-lg space-y-2 sm:py-2 sm:space-y-0 sm:space-x-6">
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
            <div>
              <div className="relative group inline-block text-left">
                <Menu>
                  <Menu.Button as={MoreToggleIcon}>
                    <BsThreeDotsVertical className="text-gray-500" />
                  </Menu.Button>
                  <Menu.Items>
                    <UpdatePost post={post} refresh={refresh} />
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={`block px-4 py-2 ${
                            active ? "bg-red-500 text-white" : "text-red-500"
                          }`}
                        >
                          Update
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={`block px-4 py-2 ${
                            active ? "bg-red-500 text-white" : "text-red-500"
                          }`}
                          onClick={handleDelete}
                        >
                          Delete
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster
        title="Success!"
        message="Post deleted 🚀"
        type="danger"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Post;
