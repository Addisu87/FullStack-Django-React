import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import axiosService from "../../helpers/axios";
import { IoCloseCircleOutline } from "react-icons/io5";

const schema = yup.object({
  body: yup.string().required(),
});

const UpdateComment = (props) => {
  const { postId, comment, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      author: comment.author.id,
      body: comment.body,
      post: postId,
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  // Add form handling logic here
  const handleUpdateComment = async (data) => {
    try {
      const requestData = {
        author: data.author,
        body: data.body,
        post: postId,
      };
      await axiosService.put(
        `/post/${postId}/comment/${comment.id}/`,
        requestData
      );
      toast.success("Comment Updated 🚀");
      closeModal();
      refresh();
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div>
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-96">
              <button
                className="absolute top-2 right-2 text-gray-600"
                aria-label="Close Modal"
                onClick={closeModal}
              >
                <IoCloseCircleOutline className="h-6 w-6 text-gray-900" />
              </button>

              <form onSubmit={handleSubmit(handleUpdateComment)}>
                <div className="mb-3">
                  <label
                    htmlFor="message"
                    className="mb-3 text-base tracking-wide text-gray-600"
                  >
                    Update Comment
                  </label>
                  <div className="relative">
                    <textarea
                      name="body"
                      id="message"
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

                <div className="flex justify-end">
                  <button
                    type="submit"
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

export default UpdateComment;
