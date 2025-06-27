import React, { useContext, useState, useRef } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import {
  FiPlus,
  FiCheckSquare,
  FiSearch,
  FiHome,
  FiLogOut,
  FiBell,
  FiMail,
  FiChevronDown,
  FiBarChart2,
  FiSettings,
  FiHexagon,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeNav, setActiveNav] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Navigation items
  const navItems = [
    { to: "add-task", label: "Create", icon: <FiPlus /> },
    { to: "my-tasks", label: "Tasks", icon: <FiCheckSquare /> },
    { to: "dashboard/browse-tasks", label: "Explore", icon: <FiSearch /> },
    { to: "analytics", label: "Insights", icon: <FiBarChart2 /> },
    { to: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-teal-50 overflow-hidden">
      {/* Header */}
      <header className="bg-teal-700 bg-opacity-95 backdrop-blur-md py-3 px-6 flex items-center justify-between sticky top-0 z-30 shadow-lg border-b border-teal-600/30">
        <Link
          to="/"
          className="flex items-center group"
          onMouseEnter={() => setActiveNav("logo")}
          onMouseLeave={() => setActiveNav(null)}
        >
          <motion.div
            animate={{
              rotate: activeNav === "logo" ? -10 : 0,
              scale: activeNav === "logo" ? 1.1 : 1,
            }}
            className="h-9 w-9 bg-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-md"
          >
            <FiHexagon className="text-white text-lg" />
          </motion.div>
          <motion.span className="text-xl font-bold text-white relative">
            TaskNest
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeNav === "logo" ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.span>
        </Link>

        <div className="flex items-center space-x-5">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full text-teal-100 hover:text-white"
          >
            <FiBell className="text-lg" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 shadow-sm"></span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full text-teal-100 hover:text-white"
          >
            <FiMail className="text-lg" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-sm"></span>
          </motion.button>

          {/* User dropdown */}
          <motion.div
            whileHover={{ y: -2 }}
            className="relative flex items-center space-x-2 cursor-pointer pl-2"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="w-8 h-8 rounded-full bg-teal-800 border-2 border-teal-500 flex items-center justify-center text-teal-100 font-medium shadow-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <FiChevronDown
              className={`text-teal-200 text-sm transition-transform ${
                showUserDropdown ? "rotate-180" : ""
              }`}
            />

            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-40 border border-teal-100"
                >
                  <div className="p-3 border-b border-teal-50 bg-teal-700 text-white">
                    <p className="font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-teal-100">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center p-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden md:flex flex-col w-72 border-r border-teal-100 bg-white/80 backdrop-blur-sm sticky top-[64px] h-[calc(100vh-64px)]"
        >
          <div className="px-6 py-8 overflow-y-auto">
            <div className="flex items-center p-3 rounded-xl bg-teal-700/5 border border-teal-700/10 shadow-inner mb-8">
              <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-teal-100 font-medium mr-3 shadow-inner">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-semibold text-teal-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-teal-600">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavLink
                to="overview"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-all group relative overflow-hidden ${
                    isActive
                      ? "bg-teal-700 text-white shadow-md"
                      : "text-teal-800 hover:bg-teal-700/10 hover:text-teal-700"
                  }`
                }
                onMouseEnter={() => setActiveNav("home")}
                onMouseLeave={() => setActiveNav(null)}
              >
                <motion.span
                  animate={{
                    x: activeNav === "home" ? 5 : 0,
                  }}
                  className="mr-3"
                >
                  <FiHome className="text-lg" />
                </motion.span>
                <span>Dashboard</span>
                {activeNav === "home" && (
                  <motion.div
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </NavLink>

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={`/dashboard/${item.to}`}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-xl transition-all group relative overflow-hidden ${
                      isActive
                        ? "bg-teal-700 text-white shadow-md"
                        : "text-teal-800 hover:bg-teal-700/10 hover:text-teal-700"
                    }`
                  }
                  onMouseEnter={() => setActiveNav(item.to)}
                  onMouseLeave={() => setActiveNav(null)}
                >
                  <motion.span
                    animate={{
                      x: activeNav === item.to ? 5 : 0,
                    }}
                    className="mr-3"
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.label}</span>
                  {activeNav === item.to && (
                    <motion.div
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-auto px-6 py-4 border-t border-teal-100">
            <motion.button
              whileHover={{ x: 3 }}
              onClick={logout}
              className="w-full flex items-center p-3 text-teal-700 hover:text-teal-900 rounded-xl transition-all group"
            >
              <span className="mr-3">
                <FiLogOut className="text-lg" />
              </span>
              <span>Sign Out</span>
              <span className="ml-auto text-xs opacity-70 bg-teal-100 group-hover:bg-teal-200 px-2 py-1 rounded">
                ⌘L
              </span>
            </motion.button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
