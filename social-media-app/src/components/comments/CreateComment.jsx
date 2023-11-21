import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosService from "../../helpers/axios";
import { randomAvatar } from "../../utils";

const schema = yup.object({
  body: yup.string().required("Comment is required"),
});

const CreateComment = (props) => {
  const { postId, refresh } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const { user } = useSelector((state) => state.auth);

  const handleComments = async (data) => {
    try {
      const commentData = {
        author: user.id,
        body: data.body,
        post: postId,
      };
      await axiosService.post(`/post/${postId}/comment/`, commentData);
      toast.success("Comment posted successfully🚀");
      refresh();
      reset();
    } catch (error) {
      toast.error("An error occurred.!");
    }
  };
  return (
    <form
      className="flex justify-between"
      onSubmit={handleSubmit(handleComments)}
    >
      <img
        className="shrink-0 rounded-full h-12 w-12 my-2"
        src={randomAvatar()}
        alt="avatar"
      />

      <div className="m-3 w-75">
        <input
          type="text"
          placeholder="Write a comment"
          {...register("body")}
          className={`py-2 rounded-pill border-cyan-100 ${
            errors.body && "border-red-500"
          }`}
        />
        {errors.body && (
          <span className="text-red-500 text-sm">{errors.body.message}</span>
        )}
      </div>

      <div className="m-auto">
        <button
          type="submit"
          className={`flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                   bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 px-3 transition duration-150 ease-in ${
                     isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                   }`}
          disabled={isSubmitting}
        >
          <span className="mr-2 uppercase">Comment</span>
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
