import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiChevronRight } from "react-icons/fi";
import { useHotkeys } from "react-hotkeys-hook";

const SearchBar = ({ isModal = false, onClose = () => {}, allTasks = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useHotkeys("ctrl+k, cmd+k", (e) => {
    e.preventDefault();
    if (isModal) onClose();
    else inputRef.current?.focus();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        if (isModal) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModal, onClose]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Search in both title and category with partial matching
      const results = allTasks.filter((task) => {
        const titleMatch = task.title.toLowerCase().includes(query);
        const categoryMatch = task.category.toLowerCase().includes(query);
        return titleMatch || categoryMatch;
      });

      setSearchResults(results);
      console.log(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allTasks]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to browse tasks with search query
      navigate(`/browse-tasks?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsFocused(false);
      if (isModal) onClose();
    }
  };

  const handleResultClick = (path) => {
    // Navigate to the specific task detail page
    navigate(path);
    console.log("Navigating to:", path);
    setSearchQuery("");
    setIsFocused(false);
    if (isModal) onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const resultItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <div
      ref={searchRef}
      className={`relative ${
        isModal ? "w-full max-w-2xl mx-auto" : "w-full max-w-xl"
      }`}
    >
      {isModal && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="flex items-center justify-end mb-4"
        >
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-teal-100 transition-colors"
            aria-label="Close search"
          >
            <FiX className="h-6 w-6 text-teal-600" />
          </button>
        </motion.div>
      )}

      <form onSubmit={handleSearchSubmit}>
  <motion.div
    layout
    className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 shadow-lg ${
      isFocused
        ? "ring-2 ring-teal-400 shadow-teal-200"
        : "shadow-gray-200 dark:shadow-gray-800"
    }`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative flex-grow">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={
          isModal ? "Search tasks or categories..." : "Search (Ctrl+K)"
        }
        className="w-full px-6 py-4 pr-12 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-l-xl text-lg placeholder-gray-400 dark:placeholder-gray-500"
      />
      <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
    </div>
    <button
      type="submit"
      className="px-6 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:from-teal-500 hover:to-teal-600 transition-all flex items-center font-medium text-lg rounded-r-xl"
      aria-label="Search"
    >
      Search
    </button>
  </motion.div>
</form>

      {/* Search results dropdown */}
      <AnimatePresence>
        {isFocused &&
          (searchResults.length > 0 || searchQuery || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-teal-100 dark:border-teal-900/50 max-h-96 overflow-y-auto"
            >
              {isLoading ? (
                <motion.div className="p-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
                </motion.div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-sm text-teal-700 dark:text-teal-300">
                    {searchResults.length} results found
                  </div>
                  {searchResults.map((task, index) => (
                    <motion.div
                      key={`${task.id}-${index}`}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={resultItemVariants}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "rgba(45, 212, 191, 0.1)",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleResultClick(`/browse-tasks/${task._id}`)
                        }
                        className="w-full text-left px-6 py-4 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border-b border-teal-100 dark:border-teal-900/30 last:border-b-0 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-teal-50 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                            {task.title}
                          </div>
                          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1 ml-4">
                            Category: {task.category}
                          </div>
                        </div>
                        <FiChevronRight className="text-teal-500" />
                      </button>
                    </motion.div>
                  ))}
                </>
              ) : searchQuery ? (
                <motion.div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-teal-200">
                    No results found for "
                    <span className="text-teal-500 dark:text-teal-400">
                      {searchQuery}
                    </span>
                    "
                  </p>
                </motion.div>
              ) : null}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
