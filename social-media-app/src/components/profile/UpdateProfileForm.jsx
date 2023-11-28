import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { MdAddAPhoto } from "react-icons/md";
import { editUser, setAuthTokens } from "../../redux/authSlice";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  bio: yup.string().required("Bio is required"),
});

const UpdateProfileForm = (props) => {
  const [avatar, setAvatar] = useState(null);
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
    defaultValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      bio: profile.bio || "",
    },
  });

  const handleProfileForm = async (data) => {
    const { first_name, last_name, bio } = data;
    const userId = user?.id;

    try {
      const formData = new FormData();
      formData.append("avatar", avatar); // Append the avatar file to the FormData
      console.log("FormData:", formData);

      const response = await dispatch(
        editUser({ formData, first_name, last_name, bio, userId })
      );
      // Update local state with the new avatar URL
      const newAvatarUrl = response.payload.avatar;
      setAvatar(newAvatarUrl); // Assuming you have a state variable for avatar URL

      console.log("Server response:", response);
      dispatch(setAuthTokens(response.payload));
      toast.success("Profile updated successfully 🚀");
      // Go back to the previous page
      navigate(-1);
    } catch (error) {
      toast.error("An error occurred.");
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(handleProfileForm)}>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="file-upload"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Avatar:
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-6">
            <div className="text-center">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="User Avatar"
                  className="mx-auto h-12 w-12 object-cover rounded-full"
                />
              ) : (
                <MdAddAPhoto className="mx-auto h-12 w-12 text-gray-300" />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      setAvatar(...e.target.files);
                      console.log("Selected avatar:", e.target.files);
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

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
          <button type="submit" className="btn-primary">
            <span className="mr-2 uppercase">Save</span>
          </button>
          <div className="text-red-500 text-xs">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
