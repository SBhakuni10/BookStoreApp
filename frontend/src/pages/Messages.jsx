import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Messages() {
  const [messages, setMessages] = useState([]);

  // Fetch all messages from backend
  useEffect(() => {
    axios
      .get("/api/admin/messages")
      .then((res) => {
        console.log("Messages fetched:", res.data);
        setMessages(res.data);
      })
      .catch(() => toast.error("Failed to load messages"));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`/api/admin/messages/${id}`);
        setMessages(messages.filter((m) => m._id !== id));
        toast.success("Message deleted successfully!");
      } catch {
        toast.error("Error deleting message");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-center">User Messages</h1>

      <div className="overflow-x-auto bg-white dark:bg-[#1f2937] shadow-lg rounded-xl transition-colors duration-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((m, i) => (
                <tr
                  key={m._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{m.name}</td>
                  <td className="py-2 px-4">{m.email}</td>
                  <td className="py-2 px-4">{m.message}</td>
                  <td className="py-2 px-4">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(m._id)}
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
                  colSpan="6"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Messages;
