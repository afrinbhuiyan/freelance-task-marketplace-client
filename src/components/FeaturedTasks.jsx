import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaStar,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components with better styling
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-teal-600 p-3 text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl focus:outline-none"
    aria-label="Next"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-teal-600 p-3 text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl focus:outline-none"
    aria-label="Previous"
  >
    <FaArrowRight className="rotate-180" />
  </button>
);

const FeaturedTasks = () => {
  const [featuredTasks, setFeaturedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  // Toggle favorite status
  const toggleFavorite = (taskId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(taskId)) {
      newFavorites.delete(taskId);
    } else {
      newFavorites.add(taskId);
    }
    setFavorites(newFavorites);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks/featured`)
      .then((res) => res.json())
      .then((data) => {
        const tasksWithImages = data.map((task) => ({
          ...task,
          // imageUrl: task.imageUrl || getRandomPlaceholderImage(),
          // userAvatar: task.userAvatar || getRandomUserAvatar(),
          // rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
          // category: task.category || getRandomCategory(),
        }));
        setFeaturedTasks(tasksWithImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(featuredTasks.length, 4),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(featuredTasks.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 text-center lg:px-0">
        <h2 className="mb-6 text-2xl font-bold">Featured Tasks</h2>
        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featuredTasks.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <h2 className="mb-6 text-2xl font-bold">Featured Tasks</h2>
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No featured tasks available at the moment. Check back later!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-start"
      >
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Featured Tasks
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Premium opportunities hand-picked for you
        </p>
      </motion.div>

      <Slider {...settings} className="featured-tasks-slider pb-2">
        {featuredTasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="px-3"
          >
            <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              {/* Task Image with Category Badge */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={task.imageUrl}
                  alt={task.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-teal-600 px-3 py-1 text-sm font-semibold text-white">
                  {task.category}
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(task._id);
                  }}
                  className={`absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full p-2 shadow-lg transition-all duration-300 ${
                    favorites.has(task._id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-red-100 hover:text-red-500"
                  }`}
                  aria-label={favorites.has(task._id) ? "Unfavorite" : "Favorite"}
                >
                  <motion.div
                    animate={{
                      scale: favorites.has(task._id) ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaHeart
                      className={`text-lg ${
                        favorites.has(task._id) ? "fill-current" : ""
                      }`}
                    />
                  </motion.div>
                </button>
              </div>

              {/* Task Content */}
              <div className="p-6">
                {/* Title and Rating */}
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1">
                    <FaStar className="mr-1 text-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-800">
                      {task.rating}
                    </span>
                  </div>
                </div>

                {/* Key Info Grid */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="font-semibold text-gray-900">
                        ${task.budget?.toLocaleString() || "Flexible"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Deadline</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                {/* User Info */}
                <div className="mb-4 flex items-center">
                  <img
                    src={task.userAvatar}
                    alt={task.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {task.userName}
                    </p>
                    <p className="text-xs text-gray-500">Posted 2 days ago</p>
                  </div>
                </div>
                {/* View Button */}
                <Link
                  to={`/browse-tasks/${task._id}`}
                  className="flex items-center justify-center rounded-lg bg-teal-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-teal-700"
                >
                  View Details
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedTasks;