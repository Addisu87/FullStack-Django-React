import React, { useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toaster from "../Toaster";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axiosService from "../../helpers/axios";
import { setToaster } from "../../redux/toasterSlice";

const schema = yup.object({
  body: yup.string().required(),
});

const UpdatePost = (props) => {
  const { post, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { toaster } = useSelector((state) => state.toaster);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      body: post.body,
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  // Add form handling logic here
  const handleUpdatePost = (data) => {
    const requestData = {
      body: data.body,
    };

    axiosService
      .put(`/post/${post.id}/`, requestData)
      .then(() => {
        setToaster({
          type: "success",
          message: "Post updated 🚀",
          show: true,
          title: "Success",
        });
        refresh();
        closeModal(); // Close the modal after successful update
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          title: "Post Error",
        });
      });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-96">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(handleUpdatePost)}>
              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="mb-3 text-base tracking-wide text-gray-600"
                >
                  Update Post
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
                  <span className="mr-2 uppercase">Update Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <Toaster
        title="Success!"
        message="Post updated 🚀"
        type="success"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default UpdatePost;
