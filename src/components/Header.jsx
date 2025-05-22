import React, { use, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../../public/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchModal from "./SearchModal";
import { AuthContext } from "../provider/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const { user, logout } = use(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Task", path: "/add-task" },
    { name: "Browse Tasks", path: "/browse-tasks" },
    { name: "My Posted Tasks", path: "/my-tasks" },
  ];

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout()
      .than(() => {
        console.log("logOUT");
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };

  return (
    <div
      className={`px-4 py-6 ${
        isHomePage ? "border-b border-[#ffffff2c]" : "bg-black"
      }`}
    >
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold flex items-center gap-3">
          <img className="w-10" src={Logo} alt="TaskHub Logo" />
          <span className="text-white font-serif">TaskHub</span>
        </NavLink>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-1 py-2 font-medium transition-colors relative text-white
                hover:text-gray-200 ${isActive ? "font-semibold border-b" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex space-x-4 items-center">
          <SearchModal></SearchModal>
          <div className="flex-none">
            <ThemeToggle />
          </div>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-indigo-400 transition-all duration-200">
                  <img
                    className="w-full h-full object-cover"
                    src={user.photoURL || "https://i.imgur.com/7k12EPD.png"}
                    alt="User profile"
                  />
                </div>
              </button>

              <div
                className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-out origin-top-right z-50 ${
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        className="w-full h-full object-cover"
                        src={user.photoURL || "https://i.imgur.com/7k12EPD.png"}
                        alt="User profile"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {user.displayName || "User"}
                      </h3>
                      <p className="text-white/80 text-xs">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile Settings
                  </NavLink>
                  <NavLink
                    to="/my-tasks"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    My Tasks
                  </NavLink>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-3 py-1.5 text-sm rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-3 py-1.5 text-sm rounded-md bg-white text-indigo-600 hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
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
