import React, { useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../../public/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Task", path: "/add-task" },
    { name: "Browse Tasks", path: "/browse-tasks" },
    { name: "My Posted Tasks", path: "/my-tasks" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <div className={`px-4 py-6 ${isHomePage ? "border-b border-[#ffffff2c]" : "bg-black"}`}>
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold flex items-center gap-3">
          <img className="w-10" src={Logo} alt="Freelanzia Logo" />
          <span className="text-white font-serif">Freelanzia</span>
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
