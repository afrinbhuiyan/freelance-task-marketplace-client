import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const SearchModal = ({ isOpen, onClose, allTasks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - separated from main modal container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000]"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 lg:mt-20 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full"
            >
              <div className="p-6">
                <SearchBar isModal={true} onClose={onClose} allTasks={allTasks}  />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;