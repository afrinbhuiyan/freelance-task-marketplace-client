import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import {
  FaSearch,
  FaFilter,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

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
      return (
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.category === "" || task.category === filters.category) &&
        (filters.minPrice === "" || task.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || task.price <= Number(filters.maxPrice)) &&
        (filters.location === "" ||
          task.location?.toLowerCase().includes(filters.location.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (filters.sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (filters.sortBy === "priceLow") return a.price - b.price;
      if (filters.sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const categories = [...new Set(tasks.map((task) => task.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <IoIosArrowForward className="text-gray-400 mx-1" />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Browse Tasks
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Discover Available Tasks
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect task that matches your skills and expertise
            </p>
          </div>
        </div>

        {/* Search and Filters - Same as before */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors"
            >
              <FaFilter className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>

              {/* Price Range Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="Min"
                    className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="Max"
                    className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    min="0"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Any location"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1 ? "Task" : "Tasks"} Found
          </h2>
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredTasks.length, 12)} of{" "}
            {filteredTasks.length}
          </div>
        </div>

        {/* Tasks Table */}
        {filteredTasks.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                            {task.title.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {task.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${task.price || task.budget || "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-amber-400 mr-1" />
                          <span className="text-sm text-gray-500">
                            {task.location || "Remote"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaClock className="text-amber-400 mr-1" />
                          <span className="text-sm text-gray-500">
                            {task.deadline}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "Urgent"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {task.status || "Open"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                           <button
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/browse-tasks/${task._id}`}
                            className="text-amber-600 hover:text-amber-900 p-1 rounded hover:bg-amber-50"
                            title="View Details"
                          >
                            <FaSearch />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-indigo-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find what
                you're looking for.
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
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{filteredTasks.length}</span>{" "}
              results
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;
