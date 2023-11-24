import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import axiosService from "../../helpers/axios";
import { useForm } from "react-hook-form";

// Custom Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-96">
          {children}
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdatePost = (props) => {
  const { post, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { user } = useSelector((state) => state.auth);

  const openModal = () => {
    setIsOpen(true);
    setValue("body", post.body); // Set the initial value of the textarea from the post body
  };

  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  const handleUpdatePost = async (data) => {
    try {
      const updateData = {
        author: post.author.id,
        body: data.body,
      };

      await axiosService.put(`/post/${post.id}/`, updateData);
      toast.success("Post Updated 🚀");
      refresh();
      closeModal();
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="w-75">
      <div className="px-1 py-1">
        <button
          onClick={openModal}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 bg-cyan-500 hover:bg-cyan-600"
        >
          <AiFillEdit className="text-white mr-2 h-5 w-5" aria-hidden="true" />
          Modify
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
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
                {...register("body", { required: "This field is required" })}
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
                 bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 px-3 transition duration-150 ease-in`}
            >
              <span className="mr-2 uppercase">Update Post</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdatePost;
