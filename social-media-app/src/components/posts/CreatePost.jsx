import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import axiosService from "../../helpers/axios";

const schema = yup.object({
  body: yup.string().required(),
});

const CreatePost = (props) => {
  const { refresh } = props;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Get user data from Redux state
  const { user } = useSelector((state) => state.auth);
  console.log("User:", user);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  const handleCreatePost = async (data) => {
    try {
      // Check if the user is authenticated
      if (!user) {
        navigate("/login");
        return;
      }

      const postData = {
        author: user.id,
        body: data.body,
      };

      console.log("Post Data:", postData);

      const response = await axiosService.post("/post/", postData);

      console.log("Post request successful:", response);
      toast.success("Post Created 🚀");
      closeModal();
      refresh();
    } catch (error) {
      console.error("Post request error:", error);
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div className="w-75">
      <input
        className="py-2 rounded-full text-primary w-full px-4 border border-cyan-100"
        type="text"
        placeholder="Write a post"
        onClick={openModal}
      />
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(handleCreatePost)}>
              <div className="mb-3">
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
                    rows={5}
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
                  className={`flex mt-2 w-32 items-center justify-center bg-gradient-to-r from-cyan-400 to-cyan-600     focus:ring-2
                  focus:ring-offset-2 focus:ring-cyan-500 mb-2  focus:outline-none text-white text-sm sm:text-base bg-cyan-500 hover:bg-cyan-600
                   rounded-2xl py-2 px-3 transition duration-150 ease-in ${
                     isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                   }`}
                  disabled={isSubmitting}
                >
                  <span className="mr-2 uppercase">Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreatePost;
