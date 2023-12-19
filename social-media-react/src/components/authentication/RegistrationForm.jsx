import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setAuthTokens } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

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
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    const { first_name, last_name, username, email, password, bio } = data;

    try {
      const response = await dispatch(
        registerUser({
          first_name,
          last_name,
          username,
          email,
          password,
          bio,
        })
      );
      // Use optional chaining and nullish coalescing
      const accessToken = response?.payload?.access ?? null;

      if (accessToken) {
        // Dispatch setAuthTokens action to update the user in the Redux state
        dispatch(setAuthTokens(response.payload));
        toast.success("A user registered successfully 🚀");
        navigate("/");
      } else {
        toast.error("An error occurred while registering. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred.!");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit(handleRegister)}
        data-testid="registration-form"
      >
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
              data-testid="first-name-field"
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
              data-testid="last-name-field"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
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
              data-testid="email-field"
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
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <BsFillShieldLockFill className="text-cyan-500" />
              </span>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              className="text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400"
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
              data-testid="bio-field"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs">{errors.bio.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className={`btn-primary mx-auto ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <span className="mr-2 uppercase">
              {loading ? "Register..." : "Sign Up"}
            </span>
          </button>
          <div className="text-red-500 text-xs">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
