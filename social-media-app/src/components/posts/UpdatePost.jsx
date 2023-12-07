import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import axiosService from "../../helpers/axios";

const schema = yup.object({
  body: yup.string().required("Message is required."),
});

const UpdatePost = (props) => {
  const { post, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { body: post.body },
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  // Add form handling logic here
  const handleUpdatePost = async (data) => {
    try {
      const updateData = {
        author: post.author.id,
        body: data.body,
      };

      await axiosService.put(`/post/${post.id}/`, updateData);
      toast.success("Post Updated 🚀");
      closeModal();
      refresh();
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="w-75">
      <div className="px-1 py-1">
        <button
          onClick={openModal}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-cyan-500 hover:text-white"
        >
          <AiFillEdit className="mr-2 h-5 w-5" aria-hidden="true" />
          Modify
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          data-testid="show-modal-form"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-96">
              <button
                className="absolute top-2 right-2 text-gray-600"
                aria-label="Close Modal"
                onClick={closeModal}
              >
                <IoCloseCircleOutline className="h-6 w-6 text-gray-900" />
              </button>

              <form
                data-testid="update-post-form"
                onSubmit={handleSubmit(handleUpdatePost)}
              >
                <div className="">
                  <label
                    htmlFor="message"
                    className="text-base tracking-wide text-gray-600"
                  >
                    Update Post
                  </label>
                  <div className="relative">
                    <textarea
                      name="body"
                      id="message"
                      data-testid="post-body-field"
                      type="text"
                      rows={4}
                      className={`block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                     sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                       errors.body ? "border-red-500" : ""
                     }`}
                      {...register("body")}
                    />

                    {errors.body && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.body.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    data-testid="update-post-submit"
                    className={`btn-primary ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    <span className="mr-2 uppercase">Update</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
