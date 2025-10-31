import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BarChart, Users, BookOpen, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    transactions: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, booksRes, transRes, msgRes] = await Promise.all([
          axios.get("http://localhost:4000/api/admin/users"),
          axios.get("http://localhost:4000/api/admin/books"),
          axios.get("http://localhost:4000/api/admin/transactions"),
          axios.get("http://localhost:4000/api/admin/messages"),
        ]);

        setStats({
          users: usersRes.data.length,
          books: booksRes.data.length,
          transactions: transRes.data.length,
          messages: msgRes.data.length,
        });
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.users, icon: <Users className="text-blue-500 w-6 h-6" /> },
    { title: "Books Available", value: stats.books, icon: <BookOpen className="text-green-500 w-6 h-6" /> },
    { title: "Transactions", value: stats.transactions, icon: <BarChart className="text-purple-500 w-6 h-6" /> },
    { title: "Messages", value: stats.messages, icon: <MessageSquare className="text-pink-500 w-6 h-6" /> },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-8 pb-16 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Admin Dashboard
          </h2>

          {/* 📊 Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1f2937] shadow-lg rounded-xl p-5 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                {item.icon}
                <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-pink-500 mt-2">{item.value}</p>
              </div>
            ))}
          </div>

          {/* ⚙️ Management Panel */}
          <div className="mt-12 bg-white dark:bg-[#1f2937] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Management Panel
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <Link
                to="manage-users"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 block transition"
              >
                Manage Users
              </Link>
              <Link
                to="manage-books"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block transition"
              >
                Manage Books
              </Link>
              <Link
                to="view-transactions"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 block transition"
              >
                View Transactions
              </Link>
              <Link
                to="messages"
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 block transition"
              >
                View Messages
              </Link>
            </div>
          </div>

          {/* 🧭 Nested Routes Content */}
          <div className="mt-12 p-6 rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
