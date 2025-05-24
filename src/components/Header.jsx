import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../../public/logo.png";
import SearchModal from "./SearchModal";
import { AuthContext } from "../provider/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const { user, logout } = React.useContext(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Task", path: "/add-task" },
    { name: "Browse Tasks", path: "/browse-tasks" },
    { name: "My Posted Tasks", path: "/my-tasks" },
    { name: "How It Works", path: "/how-to-works" },
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
      .then(() => {
        console.log("logOUT");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`px-4 py-3 sm:py-4 ${
        isHomePage ? "border-b border-[#ffffff2c]" : "bg-black"
      }`}
    >
      <div className="flex justify-between items-center max-w-[1500px] mx-auto">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-white focus:outline-none"
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
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
            <img className="w-8 sm:w-9" src={Logo} alt="TaskHub Logo" />
            <span className="text-white font-serif">TaskHub</span>
          </NavLink>
        </div>
        <nav className="hidden md:flex lg:hidden space-x-3">
          {navLinks.slice(0, 3).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-1 py-2 font-medium transition-colors relative text-white text-sm
                hover:text-gray-200 ${isActive ? "font-semibold border-b" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <nav className="hidden lg:flex space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-1 py-2 font-medium transition-colors relative text-white text-sm xl:text-base
                hover:text-gray-200 ${isActive ? "font-semibold border-b" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <SearchModal />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          {user ? (
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white/20 hover:border-yellow-400 transition-all duration-200">
                  <img
                    className="w-full h-full object-cover"
                    src={user.photoURL || "https://i.ibb.co/nqcD0KKD/free-user-icon-3296-thumb.png"}
                    alt="User profile"
                  />
                </div>
              </button>

              <div
                className={`absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-out origin-top-right z-50 ${
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-3 sm:p-4 bg-gradient-to-r from-[#f0da62] to-[#d3b638]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        className="w-full h-full object-cover"
                        src={user.photoURL || "https://i.ibb.co/nqcD0KKD/free-user-icon-3296-thumb.png"}
                        alt="User profile"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {user.displayName || "User"}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm truncate max-w-[180px]">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  <NavLink
                    to="/profile"
                    className="block px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Settings
                  </NavLink>
                  <NavLink
                    to="/my-tasks"
                    className="block px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Tasks
                  </NavLink>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
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
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-3 pb-3 space-y-2 bg-gray-900/95 rounded-lg p-3 backdrop-blur-sm">
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
          {!user && (
            <div className="pt-2 space-y-2 border-t border-white/10 mt-2">
              <NavLink
                to="/login"
                className="block w-full text-center px-4 py-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block w-full text-center px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;