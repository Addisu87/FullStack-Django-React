import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BiSolidUserCircle, BiLogIn } from "react-icons/bi";
import { loginUser, setAuthTokens } from "../../redux/authSlice";
import store from "../../redux/store";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
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
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await dispatch(loginUser({ username, password }));
      // Dispatch setAuthTokens action to update the user in the Redux state
      dispatch(setAuthTokens(response.payload));
      console.log("User after login:", response.payload);
      // Check the Redux state
      console.log("Redux state after login:", store.getState());

      navigate("/");
      toast.success("Successfully logged in.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mt-12">
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
              <BiSolidUserCircle className="text-cyan-500" />
            </div>

            <input
              id="username"
              type="text"
              name="username"
              className=" w-full text-xs placeholder-gray-500 py-2 pl-10 pr-4 rounded-2xl
                    border border-gray-400 focus:outline-none focus:border-cyan-400"
              placeholder="Username..."
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
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
            <BiLogIn />
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
