import React, { useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Toaster from "../Toaster";

const schema = yup.object({
  body: yup.string().required(),
});

const UpdatePost = (props) => {
  const { post, refresh } = props;
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleOnSubmit = () => {};

  return (
    <>
      <Menu>
        <Menu.Button>
          <BsThreeDotsVertical className="text-gray-500" />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`block px-4 py-2 ${
                  active ? "bg-red-500 text-white" : "text-red-500"
                }`}
                onClick={handleShow}
              >
                Modify
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>

      <Dialog show={show} onHide={handleClose}>
        <Dialog.Panel>
          <Dialog.Title>Update Post</Dialog.Title>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="relative">
              <textarea
                name="body"
                id="message"
                rows={3}
                className={`block px-3.5 text-xs placeholder-gray-500 pl-10 pr-4 rounded-2xl text-gray-900 shadow-sm
                     sm:text-xs sm:leading-6 border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                       errors.body ? "border-red-500" : ""
                     }`}
                placeholder="A simple post ..."
                {...register("body")}
              />
              {errors.body && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.body.message}
                </span>
              )}
            </div>
          </form>

          <button onClick={handleClose}>Cancel</button>
        </Dialog.Panel>
      </Dialog>

      <Toaster
        title="Success!"
        message="Post updated 🚀"
        type="success"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default UpdatePost;
