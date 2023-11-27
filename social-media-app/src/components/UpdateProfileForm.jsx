import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { editUser } from "../redux/authSlice";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  bio: yup.string().required("Bio is required"),
});

const UpdateProfileForm = (props) => {
  const { profile } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleProfileForm = async ({ avatar, first_name, last_name, bio }) => {
    const updateData = {
      avatar,
      first_name,
      last_name,
      bio,
    };
    await dispatch(editUser({ data: updateData, userId: user.id }))
      .then(() => {
        toast.success("Profile updated successfully 🚀");
        navigate(-1);
      })
      .catch((error) => {
        toast.error("An error occurred.");
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit(handleProfileForm)}>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="first_name"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            First Name:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <BiSolidUserCircle className="text-cyan-500" />
            </div>

            <input
              id="first_name"
              type="text"
              name="first_name"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400"
              placeholder="First name..."
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs">
                {errors.first_name.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="last_name"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Last Name:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <BiSolidUserCircle className="text-cyan-500" />
            </div>

            <input
              id="last_name"
              type="text"
              name="last_name"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400"
              placeholder="Last name..."
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Bio:
          </label>
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows={3}
              className="block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                     sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400"
              placeholder="A simple bio ..."
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-red-500 text-xs">{errors.bio.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className={`flex mt-2 w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto items-center justify-center focus:outline-none text-white text-sm sm:text-base
            bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 transition duration-150 ease-in ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <span className="mr-2 uppercase">
              {loading ? "Submitting..." : "Sign Up"}
            </span>
          </button>
          <div className="text-red-500 text-xs">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
