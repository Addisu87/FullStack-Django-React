import React, { useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import axiosService from "../../helpers/axios";

const schema = yup.object({
  body: yup.string().required(),
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
    defaultValues: {
      author: post.author.id,
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
    const { author, body } = data;

    axiosService
      .put(`/post/${post.id}/`, { author, body })
      .then(() => {
        toast.success("Post Updated 🚀");
        refresh();
      })
      .catch(() => {
        toast.error("An error occurred.");
      });
  };

  return (
    <>
      <div className="px-1 py-1 ">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-cyan-500 text-white" : "text-gray-900"
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={() => {
                console.log("Modify button clicked");
                openModal();
              }}
            >
              <AiFillEdit
                className={`${
                  active ? "text-white" : "text-cyan-500"
                } mr-2 h-5 w-5`}
                aria-hidden="true"
              />
              Modify
            </button>
          )}
        </Menu.Item>
      </div>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="modal-box bg-white p-6 rounded-lg shadow-xl w-96">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
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
    </>
  );
};

export default UpdatePost;
