import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/errorImg.png";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Image Section */}
        <div className="md:w-1/2 bg-teal-100 flex items-center justify-center p-8">
          <img 
            src={errorImg} 
            alt="Error illustration" 
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-teal-600 mb-2">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/" 
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg group"
              >
                <span className="absolute right-0 w-8 h-8 -mr-6 transition-all duration-700 ease-in-out bg-teal-700 rounded-full group-hover:-mr-2 opacity-30 group-hover:opacity-70"></span>
                <span className="absolute left-0 w-8 h-8 -ml-6 transition-all duration-700 ease-in-out bg-teal-700 rounded-full group-hover:-ml-2 opacity-30 group-hover:opacity-70"></span>
                <span className="relative flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Go to Homepage
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => window.history.back()}
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-teal-600 border-2 border-teal-500 rounded-lg group hover:text-white"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out bg-teal-500 opacity-0 group-hover:opacity-100"></span>
                <span className="relative flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Go Back
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;