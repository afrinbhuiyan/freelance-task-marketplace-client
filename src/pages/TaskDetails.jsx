import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaTag,
  FaUserTie,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const [task, setTask] = useState({});
  const [bidAmount, setBidAmount] = useState("");
  const [bidDeadline, setBidDeadline] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    fetch(`https://freelance-task-marketplace-server-mauve.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await fetch(`https://freelance-task-marketplace-server-mauve.vercel.app/bids?taskId=${id}`);
        const data = await res.json();
        setBidHistory(data);
        setDiscountApplied(data.length >= 3);
      } catch (err) {
        console.error("Error fetching bids:", err);
      }
    };

    fetchBids();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const bidData = {
      taskId: id,
      userEmail: user.email,
      userName: user.displayName,
      amount: parseFloat(bidAmount),
      deadline: bidDeadline,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://freelance-task-marketplace-server-mauve.vercel.app/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bidData),
      });

      console.log(bidData)

      const result = await res.json();

      if (result.insertedId) {
        alert("Bid submitted successfully!");
        setBidAmount("");
        setBidDeadline("");
        const updatedRes = await fetch(
          `https://freelance-task-marketplace-server-mauve.vercel.app/bids?taskId=${id}`
        );
        const updatedBids = await updatedRes.json();
        setBidHistory(updatedBids);
        setDiscountApplied(updatedBids.length >= 3);
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-32">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-yellow-600 hover:text-yellow-700 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Tasks
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-100 mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-white">
          <h2 className="text-3xl font-bold">{task.name}</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-yellow-100 bg-opacity-30 px-3 py-1 rounded-full text-sm flex items-center text-yellow-800">
              <FaTag className="mr-1" /> {task.category}
            </span>
            <span className="bg-yellow-100 bg-opacity-30 px-3 py-1 rounded-full text-sm flex items-center text-yellow-800">
              <FaCalendarAlt className="mr-1" /> {task.deadline}
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">{task.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center mb-2">
                <FaUserTie className="text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-800">Assigned To</h4>
              </div>
              <p className="text-yellow-600">
                {task.assignedTo || "Open for bidding"}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-800">Budget</h4>
              </div>
              <p className="text-yellow-600">
                {discountApplied ? (
                  <>
                    <span className="text-green-600 font-bold">
                      ${(task.budget * 0.9).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${task.budget}
                    </span>
                  </>
                ) : (
                  `$${task.budget}`
                )}
              </p>
              {discountApplied && (
                <p className="text-xs text-green-600 mt-1">
                  10% discount applied!
                </p>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-800">Bids Placed</h4>
              </div>
              <p className="text-yellow-600">{bidHistory.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Form */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-100 mb-8">
        <div className="bg-yellow-50 p-4 border-b border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-800">
            Place Your Bid
          </h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleBidSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-yellow-700 mb-1">
                Bid Amount ($)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
                min="1"
                step="0.01"
                className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Enter your bid amount"
              />
            </div>
            <div>
              <label className="block font-medium text-yellow-700 mb-1">
                Completion Deadline
              </label>
              <input
                type="date"
                value={bidDeadline}
                onChange={(e) => setBidDeadline(e.target.value)}
                required
                className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Submit Bid
            </button>
          </form>
        </div>
      </div>

      {/* Bid History */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-100">
        <div className="bg-yellow-50 p-4 border-b border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-800">
            Bid History ({bidHistory.length})
          </h3>
        </div>
        <div className="p-6">
          {bidHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No bids have been placed yet
            </p>
          ) : (
            <ul className="divide-y divide-yellow-100">
              {bidHistory.map((bid, index) => (
                <li key={bid._id} className="py-4">
                  <div className="flex items-start">
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="font-medium text-yellow-700">
                          {bid.userName}
                        </p>
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                          Bid #{index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium text-yellow-600">
                          ${bid.amount}
                        </span>{" "}
                        • Deadline:{" "}
                        {new Date(bid.deadline).toLocaleDateString()} •
                        Submitted: {new Date(bid.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
