import React, { useEffect, useState } from "react";
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

const UpdateComment = (props) => {
  const { postId, comment, refresh } = props;
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    reset(); // Reset form when the modal is closed
  };

  // Set th initial value of the body
  useEffect(() => {
    console.log("useEffect triggered");
    console.log("comment.body:", comment.body);
    setValue("body", comment.body);
  }, [comment.body, setValue]);

  // Add form handling logic here
  const handleUpdateComment = (data) => {
    const requestData = {
      author: data.author,
      body: data.body,
      post: data.postId,
    };

    axiosService
      .put(`/post/${postId}/comment/${comment.id}`, requestData)
      .then(() => {
        toast.success("Comment Updated 🚀");
        closeModal();
        refresh();
      })
      .catch(() => {
        toast.error("An error occurred.");
      });
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
                    rows={3}
                    className={`block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                 sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                   errors.body ? "border-red-500" : ""
                 }`}
                    placeholder="A simple comment ..."
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
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="mr-2 uppercase">
                    {isSubmitting ? "Updating" : "Update"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UpdateComment;
