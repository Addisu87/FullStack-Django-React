import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosService from "../../helpers/axios";

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
      data-testid="create-comment-form"
      className="flex flex-col items-stretch"
      onSubmit={handleSubmit(handleComments)}
    >
      <div className="flex flex-row space-x-3">
        <img
          className="shrink-0 rounded-full h-12 w-12"
          src={user.avatar}
          alt="avatar"
        />

        <div className="flex-1 relative">
          <textarea
            type="text"
            data-testid="comment-body-field"
            rows={2}
            placeholder="Write a comment"
            {...register("body")}
            className={`w-full text-xs placeholder-gray-500 py-2 pl-4 pr-4 rounded-2xl
              border border-gray-400 focus:outline-none focus:border-cyan-400 ${
                errors.body && "border-red-500"
              }`}
          />
          {errors.body && (
            <span className="text-red-500 text-sm">{errors.body.message}</span>
          )}
        </div>
      </div>

      <div className="self-end mr-2">
        <button
          type="submit"
          data-testid="create-comment-submit"
          className={`btn-primary ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <span className="mr-2 uppercase">
            {isSubmitting ? "Commenting" : "Comment"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
