import React from 'react'
import banner from '../assets/banner.jpeg'

function Banner() {
  return (
    <>
      <div className="max-w-screen-xl container mx-auto md:px-6 px-4 flex flex-col md:flex-row items-center mt-20 gap-10 ">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6 md:order-1 order-2">
          <h1 className="text-4xl font-bold leading-snug">
            Welcome to{" "}
            <span className="text-pink-700">NovelWay:</span> Discover{" "}
            <span className="text-pink-400">Stories That Stay With You</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
                      At NovelWay, we believe that every story holds the power to inspire, teach, and 
              transform. Our shelves bring together timeless classics, modern bestsellers, 
              and hidden gems waiting to be discovered. Whether you are a passionate reader 
              searching for your next favorite novel, a student in pursuit of knowledge, or 
              a dreamer looking for words that spark imagination, we’ve built a space where 
              books find their perfect readers. Join us in celebrating the joy of reading — 
              because every page you turn opens a new world of possibilities.
          </p>

          {/* Email Input */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm w-full md:w-3/4">
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <input
              type="email"
              placeholder="Enter your Email to login"
              required
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Button */}
          <button className="btn btn-secondary rounded-xl px-6 py-3 mt-4 shadow-md hover:scale-105 transition">
            Get Started
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 md:order-2 order-1 flex justify-center">
          <img
            className="w-[400px] h-[400px] object-cover rounded-2xl shadow-md"
            src={banner}
            alt="book banner"
          />
        </div>
      </div>
    </>
  )
}

export default Banner
