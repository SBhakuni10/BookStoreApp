import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/user/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data) {
        toast.success("Login successful");

        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);

        document.getElementById("my_modal_3").close();

        setTimeout(() => {
          if (res.data.user.role === "admin") {
            navigate("/adminDashboard"); // ✅ fixed route
          } else {
            navigate("/");
          }
          window.location.reload();
        }, 800);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>

          {/* Inputs */}
          <div className="space-y-3">
            <div>
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border rounded-md w-full outline-none dark:bg-gray-700"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="px-3 py-2 border rounded-md w-full outline-none dark:bg-gray-700"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600 duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <span className="text-gray-600 dark:text-gray-300">
              Not Registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-600 dark:text-blue-400"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
