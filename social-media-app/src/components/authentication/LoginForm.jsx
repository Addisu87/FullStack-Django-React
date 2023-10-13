import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/loginSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { user, accessToken, refreshToken, error, loading } = useSelector(
    (state) => state.login
  );

  const handleLogin = async (data) => {
    const { username, password } = data;
    await dispatch(loginUser({ username, password }));
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(handleLogin)}>
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
              className="w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
              border border-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
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
              className=" w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
              border border-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                 bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
          >
            <span className="mr-2 uppercase">Sign In</span>
          </button>
          <div className="text-sm text-red-500">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
