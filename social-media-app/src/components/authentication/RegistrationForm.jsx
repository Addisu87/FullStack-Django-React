import React, { useState } from "react";
import { useUserActions } from "../../hooks/user.actions";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };

    userActions.register(data).catch((err) => {
      if (err.message) {
        setError(err.request.response);
      }
    });
  };

  return (
    <div className="mt-5">
      <form action="#" noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label
            for="first_name"
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
              required
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            for="last_name"
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
              required
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            for="username"
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
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            for="email"
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
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label
            for="password"
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
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label
            for="message"
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
              required
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
        </div>

        <div className="text-sm text-red-500">{error && <p>{error}</p>}</div>

        <div className="flex w-full">
          <button
            type="submit"
            className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base
                   bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
          >
            <span className="mr-2 uppercase">Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
