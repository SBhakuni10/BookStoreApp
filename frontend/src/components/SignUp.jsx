import React, { useEffect, useRef } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

function SignUp() {
  const location=useLocation();
  const from=location.state?.from?.pathname || "/";
  const Navigate=useNavigate();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await axios.post("http://localhost:4000/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup successful");
          Navigate(from,{replace:true});
          
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <dialog
        ref={dialogRef}
        className="rounded-xl p-8 w-full max-w-md shadow-lg border-none m-auto bg-white dark:bg-gray-800"
      >
        {/* Close button */}
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <Link
            to={'/'}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white text-lg font-bold"
          >
            ✕
          </Link>

          {/* Heading */}
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
            Sign Up
          </h3>

          {/* Form */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300">Username</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-600">This field is required</span>
              )}
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6 flex flex-col items-center space-y-3">
            <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200">
              Sign Up
            </button>

           
            <div className="text-gray-500 dark:text-gray-300 text-xl">
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 underline"
                onClick={() => document.getElementById('my_modal_3').showModal()}
              >
                Login
              </button>
              <Login/>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default SignUp;
