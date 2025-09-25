import React from "react";
import profile from "../assets/profile.jpg";
import { Link } from "react-router-dom";

function AboutComp() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-6">
        <div className="md:w-1/2 space-y-6  order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold">About Our Book Store</h1>
          <p className="text-lg leading-relaxed">
            Welcome to <span className="text-pink-600 font-semibold">NovelWay</span>, 
            your one-stop destination for timeless classics, modern reads, and everything in between.  
            We believe that books open doors to imagination, knowledge, and endless possibilities.
          </p>
          <Link to={'/courses'} className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow-md">
            Explore Books
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Book Store"
            className="rounded-2xl shadow-lg w-[90%] md:w-[80%]"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          My mission is to make reading accessible and enjoyable for everyone.  
          From students to book enthusiasts, I aim to provide the best collection of books 
          with a seamless online shopping experience. 📚
        </p>
      </section>

      {/* Why Choose Us Cards */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Wide Collection"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Wide Collection</h3>
            <p>
              Thousands of books across genres, from fiction to academic resources.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
              alt="Affordable Pricing"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p>
              Get the best prices with discounts and offers for every reader.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="Fast Delivery"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>
              Quick and reliable shipping so your books reach you in no time.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - Only You */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Meet the Founder</h2>
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 w-full max-w-sm">
            <img
              src={profile}
              alt="Founder"
              className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-blue-600"
            />
            <h3 className="text-xl font-semibold">Sandhya Bhakuni</h3>
            <p className="text-gray-600 dark:text-gray-300">Creator & Visionary</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
             Crafting websites isn’t just work for me—it’s my passion. I combine creativity and technology to design digital experiences that are both functional and visually appealing
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutComp;
