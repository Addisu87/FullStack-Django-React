import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/loginSlice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.login);

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await dispatch(loginUser({ email, password }));
    } catch (err) {
      throw new Error(err.message || "An error occurred while logging in.");
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(handleLogin)}>
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
              className=" w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
              border border-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              autoComplete="password"
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
            className={`flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                 bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in ${
                   loading ? "opacity-70 cursor-not-allowed" : ""
                 }`}
            disabled={loading}
          >
            <span className="mr-2 uppercase">
              {/* {loading ? "Logging in..." : "Sign In"} */}
              Sign In
            </span>
          </button>
          <div className="text-sm text-red-500">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
