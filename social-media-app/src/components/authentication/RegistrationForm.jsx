import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/authSlice";
import jwtDecode from "jwt-decode";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  bio: yup.string().required("Bio is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (accessToken) {
      const user = jwtDecode(accessToken);
      // Update local state or dispatch another action if needed
    }
  }, [accessToken]);

  const handleRegister = async (userData) => {
    const { first_name, last_name, username, email, password, bio } = userData;
    dispatch(
      registerUser({
        first_name,
        last_name,
        username,
        email,
        password,
        bio,
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        // Handle registration error if necessary
      });
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="first_name"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            First Name:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <i className="fas fa-user text-blue-500"></i>
            </div>

            <input
              id="first_name"
              type="text"
              name="first_name"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Enter your first name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
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
              <i className="fas fa-user text-blue-500"></i>
            </div>

            <input
              id="last_name"
              type="text"
              name="last_name"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Enter your last name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="username"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Username:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <i className="fas fa-user text-blue-500"></i>
            </div>

            <input
              id="username"
              type="text"
              name="username"
              className=" w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
                    border border-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="email"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            E-Mail Address:
          </label>
          <div className="relative">
            <div className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <i className="fas fa-at text-blue-500"></i>
            </div>

            <input
              id="email"
              type="email"
              name="email"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="password"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Password:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <i className="fas fa-lock text-blue-500"></i>
              </span>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              autoComplete="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label
            htmlFor="message"
            className="mb-1 text-sm tracking-wide text-gray-600"
          >
            Bio:
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <i className="fas fa-lock text-blue-500"></i>
              </span>
            </div>

            <textarea
              name="message"
              id="message"
              rows={3}
              className="block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                     sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="A simple bio ..."
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className={`flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
            bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <span className="mr-2 uppercase">
              {/* {loading ? "Submitting..." : "Sign Up"} */}
              Sign Up
            </span>
          </button>
          <div className="text-sm text-red-500">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
