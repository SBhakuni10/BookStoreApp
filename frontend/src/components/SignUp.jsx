import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/user/signup", data);
      if (res.data) {
        toast.success("Signup successful");
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        if (res.data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <dialog
        ref={dialogRef}
        className="rounded-xl p-8 w-full max-w-md shadow-lg border-none m-auto bg-white dark:bg-gray-800"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white text-lg font-bold"
          >
            ✕
          </button>

          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
            Sign Up
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-gray-700 dark:text-gray-300">Username</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className="text-sm text-red-600">Required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-600">Required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="px-4 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-sm text-red-600">Required</span>}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">Role</label>
              <select
                className="px-4 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("role", { required: true })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <span className="text-sm text-red-600">Required</span>}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-3">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Sign Up
            </button>

            <div className="text-gray-500 dark:text-gray-300 text-xl">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 underline"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default SignUp;
