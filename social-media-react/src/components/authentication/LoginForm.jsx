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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await dispatch(loginUser({ username, password }));
      // Dispatch setAuthTokens action to update the user in the Redux state
      dispatch(setAuthTokens(response.payload));
      navigate("/");
      toast.success("Successfully logged in 🚀.");
    } catch (error) {
      toast.error("An error occurred.");
      console.error("Error", error);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(handleLogin)} data-testid="login-form">
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
              data-testid="username-field"
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
              data-testid="password-field"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className={`btn-primary mx-auto ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            <span className="mr-2 uppercase">
              {isSubmitting ? "Logging in" : "Sign In"}
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
