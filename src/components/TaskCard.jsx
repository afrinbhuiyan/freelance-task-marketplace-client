import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaStar,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TaskCard = ({ task }) => {
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
  return (
    <motion.div
      key={task._id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="px-3"
    >
      <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl mb-4">
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
          <div className="mb-3 flex items-start justify-start">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {task.title}
            </h3>
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
            className="flex items-center justify-center rounded-lg bg-teal-600 px-3 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-teal-700"
          >
            View Details
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
