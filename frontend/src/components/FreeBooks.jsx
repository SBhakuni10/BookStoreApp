import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";

function FreeBooks() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/books");

        // handle array or object response
        const books = Array.isArray(res.data) ? res.data : res.data.books || [];

        // filter free category
        const data = books.filter((b) => b.category?.toLowerCase() === "free");
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log("error:", error);
      }
    };

    getBooks();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Free Books
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
            Explore our free collection of books and start your reading journey
            without spending a dime. Handpicked stories that inspire, educate,
            and entertain.
          </p>
        </div>

        {/* Slider */}
        <div className="slider-container">
          <Slider {...settings}>
            {book.map((item) => (
              <div key={item._id} className="px-2">
                <Cards item={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default FreeBooks;
