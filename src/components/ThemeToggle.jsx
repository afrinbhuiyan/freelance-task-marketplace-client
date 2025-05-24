import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
     <motion.button
      onClick={toggleTheme}
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
      className="relative w-12 h-6 rounded-full p-1 focus:outline-none border border-white"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1/2 left-1 -translate-y-1/2 w-4 h-4 rounded-full bg-white flex items-center justify-center"
        animate={{
          x: theme === 'light' ? 0 : 26,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      >
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiSun className="w-2.5 h-2.5 text-yellow-600" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <FiMoon className="w-2.5 h-2.5 text-blue-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {theme === 'dark' && (
        <>
          <motion.span 
            className="absolute w-[2px] h-[2px] bg-blue-100 rounded-full"
            style={{ top: '25%', left: '30%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.span 
            className="absolute w-[3px] h-[3px] bg-blue-100 rounded-full"
            style={{ top: '15%', right: '25%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.span 
            className="absolute w-[1px] h-[1px] bg-blue-100 rounded-full"
            style={{ bottom: '20%', left: '40%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
