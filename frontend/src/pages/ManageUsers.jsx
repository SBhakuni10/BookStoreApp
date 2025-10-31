import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((res) => {
        console.log("Users fetched:", res.data);
        setUsers(res.data);
      })
      .catch(() => toast.error("Failed to load users"));
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Users</h1>

      <div className="overflow-x-auto bg-white dark:bg-[#1f2937] shadow-lg rounded-xl transition-colors duration-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((u, i) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{u.fullname}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4 capitalize">{u.role}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
