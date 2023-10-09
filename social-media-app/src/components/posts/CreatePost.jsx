import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import Toaster from "../Toaster";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const user = getUser();

  const onSubmit = (data) => {
    axiosService
      .post("/post/", { author: user?.id, body: data.body })
      .then(() => {
        reset();
        setShowToast(true);
        setToastMessage("Post created 🚀");
        setToastType("success");
      })
      .catch(() => {
        setToastMessage("An error occurred.");
        setToastType("danger");
      });
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
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleClose}
              >
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
                    {...register("body", {
                      required: "This field is required.",
                    })}
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

      {showToast && (
        <Toaster
          title="Post!"
          message={toastMessage}
          showToast={showToast}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default CreatePost;
