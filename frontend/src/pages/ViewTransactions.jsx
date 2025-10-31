import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);

  // ✅ Fetch all transactions from backend
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/admin/transactions");
      console.log("Transactions fetched:", res.data);
      setTransactions(res.data);
    } catch (error) {
      toast.error("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Delete single transaction
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`/api/admin/transactions/${id}`);
        toast.success("Transaction deleted successfully!");
        await fetchTransactions(); // 👈 Refresh after delete
      } catch {
        toast.error("Failed to delete transaction");
      }
    }
  };

  // ✅ Delete all transactions (with empty check)
  const handleDeleteAll = async () => {
    if (transactions.length === 0) {
      toast.error("No transactions available to delete!");
      return;
    }

    if (
      window.confirm(
        "⚠️ Are you sure you want to delete ALL transactions? This action cannot be undone!"
      )
    ) {
      try {
        await Promise.all(
          transactions.map((t) =>
            axios.delete(`/api/admin/transactions/${t._id}`)
          )
        );
        toast.success("All transactions deleted successfully!");
        await fetchTransactions(); // 👈 Refresh after delete all
      } catch {
        toast.error("Failed to delete all transactions");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">View Transactions</h1>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-[#1f2937] shadow-lg rounded-xl transition-colors duration-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((t, i) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{t.user?.fullname || "N/A"}</td>
                  <td className="py-2 px-4">{t.book?.name || "N/A"}</td>
                  <td className="py-2 px-4">₹{t.amount}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      t.paymentStatus === "Success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.paymentStatus}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTransactions;
