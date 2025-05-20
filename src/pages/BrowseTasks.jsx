import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FaSearch, FaFilter, FaClock, FaDollarSign, FaTag } from "react-icons/fa";

const BrowseTasks = () => {
  const loadedTasks = useLoaderData();
  const [tasks] = useState(loadedTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest"
  });

  const filteredTasks = tasks
    .filter((task) => {
      return (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.category === "" || task.category === filters.category) &&
        (filters.minPrice === "" || task.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || task.price <= Number(filters.maxPrice))
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (filters.sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (filters.sortBy === "priceLow") return a.price - b.price;
      if (filters.sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Available Tasks</h1>
          <p className="text-lg text-gray-600">Find work that matches your skills and interests</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All Categories</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="writing">Writing</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            {/* Price Range Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  placeholder="Min"
                  className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  placeholder="Max"
                  className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div 
                key={task._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {task.imageUrl && (
                  <img 
                    src={task.imageUrl} 
                    alt={task.title} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                      ${task.budget}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      <FaTag className="mr-1" /> {task.category}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <FaClock className="mr-1" /> {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      {task.postedBy?.photoURL && (
                        <img 
                          src={task.postedBy.photoURL} 
                          alt="Posted by" 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <span className="text-sm text-gray-600">
                        {task.postedBy?.displayName || 'Anonymous'}
                      </span>
                    </div>
                    <Link
                      to={`/browse-tasks/${task._id}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilters({
                  category: "",
                  minPrice: "",
                  maxPrice: "",
                  sortBy: "newest"
                });
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;
