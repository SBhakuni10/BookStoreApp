import React from 'react'
import Cards from './Cards'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Course() {
  const [book,setBook]=useState([])
  useEffect(()=>{
    const getBooks=async()=>{
      try {
       const res=await axios.get("http://localhost:4000/books")
       console.log(res.data)
       setBook(res.data)
        
      } catch (error) {
        console.log("error:",error)
      }

    };
    getBooks();
    
  },[])
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mt-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
          We are delighted to have you <span className="text-pink-500">here</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
          Step into a world where every book tells a story, sparks your imagination, and inspires your mind. From timeless classics to the latest bestsellers, our curated collection is here to bring joy to readers of all ages. Whether you're seeking knowledge, adventure, or a cozy escape, find your perfect read with us—because every great journey begins with a single page.
        </p>
        <Link to="/">
          <button className="mt-8 bg-pink-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-pink-400 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 mb-20">
        {book.map((item) => (
          <Cards item={item} key={item._id} />
        ))}
      </div>
    </div>
  )
}

export default Course

