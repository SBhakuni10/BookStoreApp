import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import SignUp from "./components/SignUp";
import Contacts from "./components/contacts/Contacts";
import About from "./components/about/About";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  

  return (
    < >
      <div className="pt-16 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/courses"
            element={authUser ? <Courses /> : <SignUp />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
