import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const [authUser] = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async (book) => {
    if (!authUser) {
      toast.error("Please login to purchase");
      return;
    }

    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL; // ✅ correct for Vite
      const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID; // ✅ correct for Vite

      // 1️⃣ Create order on backend
      const res = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book, userEmail: authUser.email }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to create order");
        return;
      }

      const { razorpayOrder } = data;

      // 2️⃣ Free book → no Razorpay popup
      if (!razorpayOrder) {
        toast.success(data.message || "Order placed successfully!");
        return;
      }

      // 3️⃣ Paid book → open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "NovelWay Book Store",
        description: book.name,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyRes = await fetch(`${API_URL}/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Payment successful!");
            } else {
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 mt-10">
      <div
        className="card w-full max-w-sm rounded-xl hover:scale-105 duration-300 
                   bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                   flex flex-col h-[420px] 
                   shadow-md hover:shadow-lg 
                   dark:shadow-[0_4px_15px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
      >
        {/* Image */}
        <figure className="h-56">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </figure>

        {/* Content */}
        <div className="card-body flex flex-col justify-between flex-1">
          <div>
            <h2 className="card-title flex justify-between items-center">
              {item.name}
              <span className="badge badge-secondary text-xs dark:bg-pink-600 dark:text-white">
                {item.category}
              </span>
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-1">
              {item.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-semibold text-pink-500">
              ₹{item.price}
            </span>
            <button
              onClick={() => handleBuyNow(item)}
              disabled={loading}
              className={`btn btn-sm bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
