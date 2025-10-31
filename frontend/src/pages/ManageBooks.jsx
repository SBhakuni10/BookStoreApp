import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/books")
      .then((res) => {
        console.log("Books fetched:", res.data);
        setBooks(res.data);
      })
      .catch(() => toast.error("Failed to load books"));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Books</h1>

      <div className="overflow-x-auto bg-white dark:bg-[#1f2937] shadow-lg rounded-xl transition-colors duration-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(books) && books.length > 0 ? (
              books.map((b, i) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{b.name}</td>
                  <td className="py-2 px-4">{b.type}</td>
                  <td className="py-2 px-4">{b.category || "N/A"}</td>
                  <td className="py-2 px-4">₹{b.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBooks;
