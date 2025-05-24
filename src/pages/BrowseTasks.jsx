import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import {
  FaSearch,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaStar,
  FaChevronDown,
  FaTags,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import BImg from "../assets/br.jpg";

const BrowseTasks = () => {
  const loadedTasks = useLoaderData();
  const [tasks] = useState(loadedTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
    location: "",
  });

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !filters.category ||
        task.category?.toLowerCase() === filters.category.toLowerCase();

      const matchesMinPrice =
        filters.minPrice !== "" ? task.price >= Number(filters.minPrice) : true;

      const matchesMaxPrice =
        filters.maxPrice !== "" ? task.price <= Number(filters.maxPrice) : true;

      const matchesLocation =
        !filters.location ||
        task.location?.toLowerCase().includes(filters.location.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesLocation
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "newest")
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (filters.sortBy === "oldest")
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (filters.sortBy === "priceLow") return a.price - b.price;
      if (filters.sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const categories = [...new Set(tasks.map((task) => task.category))];

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

  return (
    <div className="min-h-screen pt-18">
      <div
        className="lg:p-20 lg:px-40 p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${BImg})` }}
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium  text-white hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward className="text-[#ffffff5e] mx-1" />
                <span className="ml-1 text-sm font-medium text-[#ffffff5e] md:ml-2">
                  Browse Tasks
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mb-8">
          <div className="mt-6">
            <h1 className="text-4xl text-white mb-3 roboto">
              Discover <span className="text-[#eed463]">Tasks</span> That Match
              Your Skills
            </h1>
          </div>
        </div>

        <div className="bg-white p-3 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search tasks by title, description or skills..."
                className="pl-10 pr-4 py-3 w-full text-gray-900 placeholder-gray-500 placeholder:text-sm placeholder:font-serif focus:placeholder:text-yellow-400
                  bg-transparent border-transparent focus:outline-none focus:ring-0 focus:border-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaTimes className="text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white border border-yellow-500 hover:bg-white group ${
                showFilters
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-white text-yellow-500 hover:bg-indigo-50"
              }`}
            >
              {showFilters ? (
                <>
                  Hide Filters <FaChevronUp className="ml-2 text-xs" />
                </>
              ) : (
                <>
                  <span class="w-48 h-48 rotate-[-40deg] bg-yellow-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-yellow-600 transition-colors duration-300 ease-in-out group-hover:text-white flex items-center">
                    Show Filters <FaChevronDown className="ml-2 text-sm" />
                  </span>
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-yellow-200 mt-4 mx-1">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 p-1.5">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full border text-xs border-yellow-300 rounded-full px-4 py-2.5 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        value={filters.category}
                        onChange={(e) =>
                          setFilters({ ...filters, category: e.target.value })
                        }
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-3 top-3.5 text-yellow-400 text-xs pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 p-1.5">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Min"
                          className="pl-8 pr-3 py-2.5 text-xs w-full border border-yellow-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          value={filters.minPrice}
                          onChange={(e) =>
                            setFilters({ ...filters, minPrice: e.target.value })
                          }
                          min="0"
                        />
                      </div>
                      <span className="text-gray-400 text-sm">—</span>
                      <div className="relative flex-1">
                        <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Max"
                          className="pl-8 pr-3 py-2.5 text-xs w-full border border-yellow-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            setFilters({ ...filters, maxPrice: e.target.value })
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 p-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Remote, City, Country"
                        className="pl-10 pr-4 py-2.5 text-xs w-full border border-yellow-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({ ...filters, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 p-1.5">
                      Required Skills
                    </label>
                    <div className="relative">
                      <FaTags className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="React, Design, etc."
                        className="pl-10 pr-4 py-2.5 text-xs w-full border border-yellow-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        value={filters.skills}
                        onChange={(e) =>
                          setFilters({ ...filters, skills: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 p-1.5">
                      Sort By
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full border text-xs border-yellow-300 rounded-full px-4 py-2.5 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        value={filters.sortBy}
                        onChange={(e) =>
                          setFilters({ ...filters, sortBy: e.target.value })
                        }
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                      </select>
                      <FaChevronDown className="absolute right-3 top-3.5 text-yellow-400 text-xs pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-yellow-300">
                  <button
                    onClick={() =>
                      setFilters({
                        category: "",
                        minPrice: "",
                        maxPrice: "",
                        location: "",
                        skills: "",
                        sortBy: "newest",
                      })
                    }
                    class="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white border border-yellow-400 hover:bg-white group"
                  >
                    <span class="w-48 h-48 rounded-xl rotate-[-40deg] bg-yellow-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span class="relative w-full text-left text-yellow-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                      Reset Filters
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mx-8 md:mx-12 lg:mx-40">
        <div className="flex justify-end my-6">
          <div className="text-sm text-gray-500 hover:text-amber-400">
            Showing {Math.min(filteredTasks.length, 12)} of{" "}
            {filteredTasks.length}
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >

                <div className="p-5 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl roboto font-medium text-gray-900 mb-1">
                        {task.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                        <FaStar className="text-yellow-400 mr-1" />
                        {getRandomRating()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <FaDollarSign className="text-gray-300 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="font-semibold text-gray-900">
                          ${task.budget}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-300 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-semibold text-gray-900">
                          {task.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-300 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">
                          {task.location || "Remote"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-600 mt-2 line-clamp-2 mb-3">
                      {task.description}
                    </p>
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 mb-2">
                        {task.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "Urgent"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100"
                      }`}
                    >
                      {task.status || "Open"}
                    </span>
                    <Link
                      to={`/browse-tasks/${task._id}`}
                      className="text-yellow-600 hover:text-yellow-800 font-medium text-sm flex items-center transition-colors"
                    >
                      View Details
                      <IoIosArrowForward className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-50 rounded-full flex items-center justify-center">
                <FaSearch className="text-yellow-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    category: "",
                    minPrice: "",
                    maxPrice: "",
                    sortBy: "newest",
                    location: "",
                  });
                }}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {filteredTasks.length > 0 && (
          <div className="mt-10 flex justify-center mb-10">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-yellow-500 text-white">
                1
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                3
              </button>
              <span className="text-gray-500">...</span>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                8
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;
