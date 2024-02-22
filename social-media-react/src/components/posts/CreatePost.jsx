import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import axiosService from "../../helpers/axios";

const schema = yup.object({
  body: yup.string().required("Message is required."),
});

const CreatePost = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refresh } = props;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Get user data from Redux state
  const { user } = useSelector((state) => state.auth);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  const handleCreatePost = async (data) => {
    try {
      // Check if the user is authenticated
      if (!user) {
        navigate("/login/");
        return;
      }

      const postData = {
        author: user?.id,
        body: data.body,
      };

      await axiosService.post("/post/", postData);
      toast.success("Post Created 🚀");
      closeModal();
      refresh();
    } catch (error) {
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div className="w-75">
      <input
        data-testid="show-modal-form"
        className="py-2 rounded-full text-primary w-full px-4 border border-cyan-100"
        type="text"
        placeholder="Write a post"
        onClick={openModal}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-600 opacity-50"></div>

          <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-10">
            <button
              className="absolute top-2 right-2 text-gray-600 w-6 h-6"
              onClick={closeModal}
            >
              <MdClose />
            </button>

            <form
              onSubmit={handleSubmit(handleCreatePost)}
              data-testid="create-post-form"
            >
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
                    data-testid="post-body-field"
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
                  data-testid="create-post-submit"
                  className={`btn-primary ${
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
      )}
    </div>
  );
};

export default CreatePost;
