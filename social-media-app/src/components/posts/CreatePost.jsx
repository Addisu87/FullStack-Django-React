import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosService from "../../helpers/axios";
import Toaster from "../Toaster";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  body: yup.string().required(),
});

const CreatePost = (props) => {
  const { refresh } = props;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const { user } = useSelector((state) => state.auth);

  const handleCreatePost = (data) => {
    // Check if the user is authenticated
    if (!user) {
      navigate("/login");
      return;
    }

    axiosService
      .post("/post/", { author: user?.id, body: data.body })
      .then(() => {
        reset();
        setToastMessage("Post created 🚀");
        setToastType("success");
        setShowToast(true);
        refresh();
      })
      .catch((err) => {
        setToastMessage("An error occurred.");
        setToastType("danger");
        setShowToast(true);
      });
  };

  const handleToasterClose = () => {
    setShowToast(false);
  };

  return (
    <div className="w-75">
      <input
        className="py-2 rounded-full text-primary w-full px-4 border border-cyan-100"
        type="text"
        placeholder="Write a post"
        onClick={() => document.getElementById("my_modal_3").showModal()}
        data-testid="show-modal-form"
      />
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit(handleCreatePost)}>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>

              <div className="flex flex-col mb-3">
                <label
                  htmlFor="message"
                  className="mb-3 text-base tracking-wide text-gray-600"
                >
                  Create Post
                </label>
                <div className="relative">
                  <textarea
                    name="body"
                    id="message"
                    rows={3}
                    className={`block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                     sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                       errors.body ? "border-red-500" : ""
                     }`}
                    placeholder="A simple post ..."
                    {...register("body")}
                  />
                  {errors.body && (
                    <span className="text-sm text-red-500 mt-1">
                      {errors.body.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                   bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 px-3 transition duration-150 ease-in ${
                     isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                   }`}
                  disabled={isSubmitting}
                >
                  <span className="mr-2 uppercase">Post</span>
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      <div>
        {/* Render the Toaster component */}
        {showToast && (
          <Toaster
            title="Post!"
            message={toastMessage}
            showToast={showToast}
            type={toastType}
            onClose={handleToasterClose}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
