import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Subscribed with:", email);
      setIsSuccess(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.log(err);
      setError("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold text-yellow-400 hover:text-yellow-500 transition-colors">
              Task<span className="text-white">Hub</span>
            </Link>
            <p className="text-gray-300">
              Connecting skilled professionals with meaningful tasks and
              projects worldwide.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Browse Tasks", path: "/browse-tasks" },
                { name: "Post a Task", path: "/add-task" },
                { name: "How It Works", path: "/how-it-works" },
                { name: "Pricing", path: "/pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400 pb-2 inline-block">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MdEmail className="text-yellow-400 mt-1 flex-shrink-0 text-xl" />
                <a href="mailto:support@taskhub.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  support@taskhub.com
                </a>
              </div>
              <div className="flex items-start space-x-4">
                <MdPhone className="text-yellow-400 mt-1 flex-shrink-0 text-xl" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start space-x-4">
                <MdLocationOn className="text-yellow-400 mt-1 flex-shrink-0 text-xl" />
                <address className="text-gray-300 hover:text-yellow-400 transition-colors not-italic">
                  123 Task Street<br />
                  San Francisco, CA 94107
                </address>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400 pb-2 inline-block">
              Stay Updated
            </h4>
            <p className="text-gray-300">
              Subscribe to get updates on new tasks and features.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-5 py-3 pr-12 rounded-lg border-2 ${
                    error ? "border-red-500" : "border-gray-700"
                  } 
                  bg-gray-800 text-white placeholder-gray-400 
                  focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                  transition-all duration-200 shadow-lg
                  hover:border-gray-600`}
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  aria-label="Email address for newsletter subscription"
                  disabled={isSubmitting}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {error && (
                  <div className="absolute -bottom-6 left-0 text-sm text-red-400">
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <RiSendPlaneFill className="mr-2" />
                    Subscribe Now
                  </>
                )}
              </button>

              {isSuccess && (
                <div className="p-3 bg-green-100 text-green-800 rounded-lg text-center">
                  Thank you for subscribing!
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear}{" "}
            <span className="text-yellow-400">TaskHub</span>. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Cookies Policy", path: "/cookies" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;