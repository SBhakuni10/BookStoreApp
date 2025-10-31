import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  // 🌙 Theme handling
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 🧲 Sticky navbar effect
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧭 Navigation items
  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/courses">Courses</Link></li>
      <li><Link to="/contact">Contact</Link></li>

      {/* 🔐 Show admin link if logged in as admin */}
      {authUser?.role === "admin" && (
        <li><Link to="/adminDashboard">Admin Panel</Link></li>
      )}
    </>
  );

  return (
    <div
      className={`w-full p-2 fixed top-0 left-0 right-0 z-50 ${
        sticky
          ? "shadow-md bg-base-200 dark:bg-gray-900 transition-all ease-in-out duration-300"
          : "bg-base-100 dark:bg-gray-900"
      }`}
    >
      <div className="navbar">
        {/* 🏠 Left Section */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-gray-200 rounded-box mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>

          {/* Brand */}
          <Link to="/" className="btn btn-ghost text-2xl text-pink-500">
            NovelWay
          </Link>
        </div>

        {/* 🌐 Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 dark:text-gray-200 text-lg">
            {navItems}
          </ul>
        </div>

        {/* ⚙️ Right Section */}
        <div className="navbar-end space-x-3">
          {/* 🔍 Search */}
          <div className="hidden md:block">
            <label className="input flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1">
              <svg
                className="h-[1em] opacity-50 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 focus:ring-0"
              />
            </label>
          </div>

          {/* 🌗 Theme Toggle */}
          <div className="cursor-pointer">
            {theme === "light" ? (
              <svg
                className="h-7 w-7 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme("dark")}
              >
                <path
                  fill="currentColor"
                  d="M21.64 13A9 9 0 1111 2.36a7 7 0 1010.64 10.64z"
                />
              </svg>
            ) : (
              <svg
                className="h-7 w-7 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme("light")}
              >
                <path
                  fill="currentColor"
                  d="M12 4.75a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zM12 17.25a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zM4.22 5.64a1 1 0 011.41 0h0a1 1 0 010 1.41h0a1 1 0 01-1.41-1.41zM18.36 19.78a1 1 0 011.41 0h0a1 1 0 010 1.41h0a1 1 0 01-1.41-1.41zM17.25 12a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zM6.75 12a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zM5.64 18.36a1 1 0 011.41 0h0a1 1 0 010 1.41h0a1 1 0 01-1.41-1.41zM19.78 5.64a1 1 0 011.41 0h0a1 1 0 010 1.41h0a1 1 0 01-1.41-1.41zM12 7a5 5 0 100 10A5 5 0 0012 7z"
                />
              </svg>
            )}
          </div>

          {/* 🔑 Auth Section */}
          {authUser ? (
            <Logout />
          ) : (
            <div>
              <button
                className="bg-black dark:bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-slate-800 dark:hover:bg-pink-600 duration-300"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
