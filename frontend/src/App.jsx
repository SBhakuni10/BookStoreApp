import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";


// 🌐 Public Pages
import Home from "./home/Home";
import Courses from "./courses/Courses";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; // ✅ Added global Login modal
import Contacts from "./components/contacts/Contacts";
import About from "./components/about/About";

// 🛡️ Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageBooks from "./pages/ManageBooks";
import ViewTransactions from "./pages/ViewTransactions";
import Messages from "./pages/Messages";

function App() {
  const [authUser] = useAuth();

  // ✅ Protected route for logged-in users
  const ProtectedRoute = ({ children }) =>
    authUser ? children : <Navigate to="/signup" replace />;

  // ✅ Admin-only route protection
  const AdminRoute = ({ children }) =>
    authUser?.role === "admin" ? children : <Navigate to="/signup" replace />;

  return (
    <>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 🔒 User Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Admin Routes */}
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-books" element={<ManageBooks />} />
          <Route path="view-transactions" element={<ViewTransactions />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Global Login Modal */}
      <Login />

      {/* ✅ Global Toaster — always visible above modals */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 99999, // ensures toast appears above all dialogs
          },
        }}
      />
    </>
  );
}

export default App;
