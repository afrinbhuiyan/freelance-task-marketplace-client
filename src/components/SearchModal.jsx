import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const SearchModal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter(
          (item) => item.toLowerCase() !== searchQuery.toLowerCase()
        ),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      document.getElementById("search_modal").close();
      console.log("Searching for:", searchQuery);
    }
  };

  const handleRecentSearchClick = (term) => {
    setSearchQuery(term);
    document.getElementById("search_modal").close();
    console.log("Searching for:", term);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="relative">
      <button
        onClick={() => document.getElementById("search_modal").showModal()}
        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        aria-label="Open search"
      >
        <CiSearch className="text-white text-2xl" />
      </button>

      <dialog id="search_modal" className="modal backdrop:bg-black/60">
        <form
          method="dialog"
          className="absolute top-1/3 mt-5 right-1/4 z-10 mr-28"
        >
          <button className="text-white">
            <RxCross1 />
          </button>
        </form>
        <div className="modal-box max-w-2xl p-0 bg-white rounded-xl shadow-xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <div className="flex items-center px-6 py-5 border-b border-gray-200">
                <CiSearch className="text-gray-500 text-xl mr-3" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tasks, freelancers, or categories..."
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-[#f7d646] hover:bg-[#e5c53f] text-gray-900 rounded-lg transition-colors font-medium shadow-sm"
                >
                  Search
                </button>
              </div>

              {recentSearches.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-b-xl">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-gray-700 font-medium">
                      Recent Searches
                    </h3>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleRecentSearchClick(term)}
                        className="px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="w-full h-full cursor-default">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SearchModal;
