import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdEmail, MdLogin } from "react-icons/md";

const schema = yup.object().shape({
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
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async ({ email, password }) => {
    await dispatch(loginUser({ email, password }))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Handle login error if necessary
      });
  };

  return (
    <div className="mt-12">
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
              <MdEmail className="text-cyan-500" />
            </div>

            <input
              id="email"
              type="email"
              name="email"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400"
              placeholder="Email..."
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
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
            <div className="absolute inline-flex items-center justify-center  left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <BsFillShieldLockFill className="text-cyan-500" />
              </span>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              className="w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
              border border-gray-400 focus:outline-none focus:border-cyan-400"
              placeholder="Password..."
              autoComplete="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className={`flex mt-2 w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                 bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 transition duration-150 ease-in ${
                   loading ? "opacity-70 cursor-not-allowed" : ""
                 }`}
            disabled={loading}
          >
            <span className="mr-2 uppercase">
              {loading ? "Logging in" : "Sign In"}
            </span>
            <MdLogin />
          </button>
          <div className="text-sm text-red-500">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
