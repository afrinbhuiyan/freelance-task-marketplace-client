import React, { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../../public/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", protected: false },
    { name: "Add Task", path: "/add-task", protected: true },
    { name: "Browse Tasks", path: "/browse-tasks", protected: false },
    { name: "My Posted Tasks", path: "/my-tasks", protected: true },
  ];

  return (
    <div className="px-4 py-6 border-b border-[#ffffff2c]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold flex items-center gap-3">
          <img className="w-10" src={Logo} alt="Freelanzia Logo" />
          <span className="text-white font-serif">Freelanzia</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-1 py-2 font-medium transition-colors relative text-white
                hover:text-gray-200 ${isActive ? "font-semibold" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* <div>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <CiSearch color="#ffffff" size={30} />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle bg-black absolute -right-2 -top-5 z-50">
                    ✕
                  </button>
                </form>
                <div className="flex justify-between">
                  <div className="flex">
                    <CiSearch size={30} />
                    <input type="search" name="Search" id="" />
                  </div>
                  <button className="btn">Search</button>
                </div>
              </div>
            </dialog>
          </div> */}
          <div className="relative">
            <button
              onClick={() =>
                document.getElementById("search_modal").showModal()
              }
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              aria-label="Open search"
            >
              <CiSearch className="text-white text-2xl" />
            </button>

            <dialog id="search_modal" className="modal backdrop:bg-black/80">
              <div className="modal-box max-w-2xl p-0 bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle search submission here
                    console.log("Searching for:", e.target.search.value);
                    document.getElementById("search_modal").close();
                  }}
                >
                  <div className="relative">
                    {/* Search input and submit button row */}
                    <div className="flex items-center px-6 py-4 border-b border-white/10">
                      <CiSearch className="text-white/70 text-xl mr-3" />
                      <input
                        type="search"
                        name="search"
                        placeholder="Search for tasks, freelancers, or categories..."
                        className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="ml-4 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      >
                        Search
                      </button>
                    </div>

                    {/* Recent searches */}
                    <div className="p-6">
                      <h3 className="text-white/80 font-medium mb-3">
                        Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Web Design",
                          "Content Writing",
                          "Logo Design",
                          "Social Media",
                        ].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              // Auto-fill search and submit when clicking recent terms
                              const input = document.querySelector(
                                '#search_modal input[name="search"]'
                              );
                              input.value = term;
                              input.form.dispatchEvent(
                                new Event("submit", { cancelable: true })
                              );
                            }}
                            className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Close button */}
                    <form method="dialog" className="absolute right-4 top-4">
                      <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </form>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 bg-gray-900/95 rounded-lg p-4 backdrop-blur-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium text-white
                ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 space-y-2 border-t border-white/10 mt-2">
            <NavLink
              to="/login"
              className="block w-full text-center px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="block w-full text-center px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
