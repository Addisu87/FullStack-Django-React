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
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const { user } = useSelector((state) => state.auth);

  const createComments = async (data) => {
    const commentData = {
      author: user.id,
      body: data.body,
      post: postId,
    };

    try {
      await axiosService.post(`/post/${postId}/comment/`, commentData);
      toast.success("Comment posted successfully🚀");
      refresh();
      reset();
    } catch (error) {
      toast.error("An error occurred while creating the comment.");
    }
  };
  return (
    <form
      className="flex justify-between"
      onSubmit={handleSubmit(createComments)}
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
          className="bg-cyan-200 text-white px-4 py-2 rounded-full disabled:bg-gray-300"
          disabled={!isValid}
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
