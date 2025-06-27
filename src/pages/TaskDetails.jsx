import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaTag,
  FaUserTie,
  FaDollarSign,
  FaArrowLeft,
  FaClock,
  FaInfoCircle,
  FaUser,
  FaEnvelope,
  FaCode,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState({
    _id: "6831e98c26562e522beb029e",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3L3BAyaO26EaWy_JvjzJLv2CS9Bnep_vEYxJJ8MS4bZQUOknuywFDjts_RFc-c8l2HmA&usqp=CAU",
    title: "Build a React Portfolio Website",
    priority: "Medium",
    category: "Web Development",
    deadline: "2025-01-06",
    estimatedTime: "16",
    description: "Create a personal portfolio using React, Tailwind CSS, and deploy it on Vercel.",
    budget: "15000",
    status: "Not Started",
    email: "afrin12434@2.com",
    name: "Afrin",
    userEmail: "afrin12434@2.com",
    userName: "Afrin"
  });
  const [bidAmount, setBidAmount] = useState("");
  const [bidDeadline, setBidDeadline] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);

  const fetchBids = async () => {
    try {
      const mockBids = [
        {
          _id: "1",
          taskId: id,
          userEmail: "bidder1@example.com",
          userName: "John Doe",
          amount: 12000,
          deadline: "2025-01-05",
          timestamp: "2023-11-15T10:30:00Z"
        },
        {
          _id: "2",
          taskId: id,
          userEmail: "bidder2@example.com",
          userName: "Jane Smith",
          amount: 13500,
          deadline: "2025-01-04",
          timestamp: "2023-11-16T14:45:00Z"
        }
      ];
      setBidHistory(mockBids);
      setDiscountApplied(mockBids.length >= 3);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const bidData = {
      taskId: id,
      userEmail: user?.email || "guest@example.com",
      userName: user?.displayName || "Guest User",
      amount: parseFloat(bidAmount),
      deadline: bidDeadline,
      timestamp: new Date().toISOString(),
    };

    try {
      Swal.fire({
        title: "Success!",
        text: "Bid submitted successfully!",
        icon: "success",
        confirmButtonColor: "#38B2AC",
        background: "#F7FAFC",
      });
      setBidAmount("");
      setBidDeadline("");
      fetchBids();
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Tasks
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Task Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100">
            <div className="relative h-48 w-full">
              <img 
                src={task.imageUrl} 
                alt={task.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-3xl font-bold">{task.title}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-teal-100 bg-opacity-30 px-3 py-1 rounded-full text-sm flex items-center text-teal-800 backdrop-blur-sm">
                    <FaTag className="mr-1" /> {task.category}
                  </span>
                  <span className="bg-teal-100 bg-opacity-30 px-3 py-1 rounded-full text-sm flex items-center text-teal-800 backdrop-blur-sm">
                    <FaCalendarAlt className="mr-1" /> 
                    {new Date(task.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaInfoCircle className="text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800">Description</h3>
              </div>
              <p className="text-gray-700 mb-6">{task.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center mb-2">
                    <FaUserTie className="text-teal-600 mr-2" />
                    <h4 className="font-semibold text-teal-800">Assigned To</h4>
                  </div>
                  <p className="text-teal-600">
                    {task.assignedTo || "Open for bidding"}
                  </p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center mb-2">
                    <FaCode className="text-teal-600 mr-2" />
                    <h4 className="font-semibold text-teal-800">Status</h4>
                  </div>
                  <p className="text-teal-600 capitalize">{task.status.toLowerCase()}</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-teal-600 mr-2" />
                    <h4 className="font-semibold text-teal-800">Estimated Time</h4>
                  </div>
                  <p className="text-teal-600">{task.estimatedTime} hours</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center mb-2">
                    <FaDollarSign className="text-teal-600 mr-2" />
                    <h4 className="font-semibold text-teal-800">Budget</h4>
                  </div>
                  <p className="text-teal-600">
                    {discountApplied ? (
                      <>
                        <span className="text-green-600 font-bold">
                          ${(parseFloat(task.budget) * 0.9).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${task.budget}
                        </span>
                      </>
                    ) : (
                      `$${parseFloat(task.budget).toLocaleString()}`
                    )}
                  </p>
                  {discountApplied && (
                    <p className="text-xs text-green-600 mt-1">
                      10% discount applied (3+ bids)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100">
            <div className="bg-teal-50 p-4 border-b border-teal-200">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaDollarSign className="text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800">
                  Place Your Bid
                </h3>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-teal-700 mb-1">
                    Bid Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      min="1"
                      step="0.01"
                      className="w-full border border-teal-200 rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                      placeholder="Enter your bid amount"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-teal-700 mb-1">
                    Completion Deadline
                  </label>
                  <input
                    type="date"
                    value={bidDeadline}
                    onChange={(e) => setBidDeadline(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-teal-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Submit Bid
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Owner */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100">
            <div className="bg-teal-50 p-4 border-b border-teal-200">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaUser className="text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800">
                  Task Owner
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 h-12 w-12 rounded-full flex items-center justify-center text-teal-800 font-bold mr-3">
                  {task.userName?.charAt(0) || "A"}
                </div>
                <div>
                  <h4 className="font-medium text-teal-800">{task.userName}</h4>
                  <p className="text-sm text-teal-600">{task.userEmail}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <FaEnvelope className="text-teal-500 mr-2" />
                  <span className="text-gray-600">{task.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FaTag className="text-teal-500 mr-2" />
                  <span className="text-gray-600">Posted: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bid History */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100">
            <div className="bg-teal-50 p-4 border-b border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-2 rounded-full mr-3">
                    <FaCheckCircle className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-teal-800">
                    Bid History
                  </h3>
                </div>
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm font-medium">
                  {bidHistory.length}
                </span>
              </div>
            </div>
            <div className="p-6">
              {bidHistory.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No bids have been placed yet</p>
                  <p className="text-sm text-teal-600 mt-1">Be the first to bid!</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {bidHistory.map((bid, index) => (
                    <li key={bid._id} className="border-b border-teal-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="bg-teal-100 h-10 w-10 rounded-full flex items-center justify-center text-teal-800 font-bold mr-3 mt-1">
                          {bid.userName?.charAt(0) || "B"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-teal-800">{bid.userName}</h4>
                            <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                              Bid #{index + 1}
                            </span>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm font-medium text-teal-600">
                              ${bid.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Deadline: {new Date(bid.deadline).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {new Date(bid.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;