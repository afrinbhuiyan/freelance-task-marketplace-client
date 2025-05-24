import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
console.log(motion)

const FreelancerReviewSystem = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      comment:
        "Absolutely fantastic service! The team went above and beyond to deliver exceptional results.",
      date: "2023-05-15",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 4,
      comment:
        "Great product quality, though delivery took a bit longer than expected.",
      date: "2023-04-22",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    avatar: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("read");

  const handleRatingSelect = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const review = {
        id: reviews.length + 1,
        name: newReview.name || "Anonymous",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        avatar:
          newReview.avatar ||
          `https://ui-avatars.com/api/?name=${
            newReview.name || "User"
          }&background=random`,
      };

      setReviews([review, ...reviews]);
      setNewReview({ name: "", rating: 0, comment: "", avatar: "" });
      setIsSubmitting(false);
      setActiveTab("read");
    }, 1000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400 text-lg" />
      ) : (
        <FaRegStar key={i} className="text-yellow-400 text-lg" />
      )
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="text-center lg:text-left">
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center mb-8">
                <div className="text-5xl font-bold mr-0 sm:mr-4 mb-2 sm:mb-0">
                  4.9<span className="text-2xl text-gray-500">/5</span>
                </div>
                <div className="text-gray-600 text-center sm:text-left">
                  <div>Clients rate professionals</div>
                  <div className="text-yellow-500 font-medium text-lg">★★★★★</div>
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-bold mb-6">
                88M+ Happy Clients
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold  mb-4">
                Join World's Best Marketplace for Workers
              </h2>

              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-1">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <ul className="space-y-3 mb-6 sm:mb-8 flex flex-col items-center lg:items-start">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>
                    Connect to freelancers with proven business experience
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>
                    Get matched with the perfect talent by a customer success
                    manager
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>
                    Unmatched quality of remote, hybrid, and flexible jobs
                  </span>
                </li>
              </ul>

              <div className="text-center lg:text-left">
                <button className="px-6 sm:px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto">
                  Find Talent →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="w-full lg:w-1/2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("read")}
                className={`py-2 px-4 font-medium text-sm sm:text-base ${
                  activeTab === "read"
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Read Reviews
              </button>
              <button
                onClick={() => setActiveTab("write")}
                className={`py-2 px-4 font-medium text-sm sm:text-base ${
                  activeTab === "write"
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Write a Review
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "read" ? (
                <motion.div
                  key="read"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
                        >
                          <div className="flex items-start">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-4"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between flex-wrap">
                                <h3 className="font-medium text-gray-900 text-base sm:text-lg">
                                  {review.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex mt-1 mb-2">
                                {renderStars(review.rating)}
                              </div>
                              <p className="text-gray-700 text-sm sm:text-base">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          No reviews yet. Be the first to review!
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="write"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Share Your Experience
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name (optional)
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={newReview.name}
                          onChange={(e) =>
                            setNewReview({ ...newReview, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Rating
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingSelect(star)}
                              className="focus:outline-none"
                            >
                              {star <= newReview.rating ? (
                                <FaStar className="text-yellow-400 text-2xl" />
                              ) : (
                                <FaRegStar className="text-yellow-400 text-2xl hover:text-yellow-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="comment"
                          rows="4"
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              comment: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          placeholder="Share details about your experience..."
                          required
                        ></textarea>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveTab("read")}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isSubmitting ||
                            newReview.rating === 0 ||
                            !newReview.comment
                          }
                          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelancerReviewSystem;
