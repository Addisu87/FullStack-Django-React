import React from "react";
import RegistrationForm from "../components/authentication/RegistrationForm";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-4 md:px-6 lg:px-8 py-6 rounded-3xl w-96 max-w-md">
        <div className="font-normal self-center text-xl sm:text-2xl text-gray-800">
          Welcome to the Addgram!
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>
        <RegistrationForm />
      </div>
      <div className="flex justify-center items-center mt-6">
        <div className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
          <span className="ml-2">
            You have an account?
            <Link
              to="/login/"
              className="text-xs ml-2 text-blue-500 font-semibold"
            >
              Login here.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
