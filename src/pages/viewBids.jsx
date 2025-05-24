import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaHandshake } from "react-icons/fa";
import { useLoaderData } from "react-router";

const ViewBids = () => {
  const task = useLoaderData();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://freelance-task-marketplace-server-v2ix.vercel.app/bids?taskId=${task._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bids", err);
        setLoading(false);
      });
  }, [task._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 pt-52">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-amber-800">
              Bids for: <span className="text-amber-600">{task.title}</span>
            </h2>
            <p className="text-amber-700 mt-1">
              {bids.length} {bids.length === 1 ? "bid" : "bids"} placed
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to task
          </button>
        </div>

        {bids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-amber-700 border border-amber-100">
            <FaHandshake className="mx-auto text-4xl text-amber-400 mb-3" />
            <p className="text-lg font-medium">
              No bids have been placed for this task yet.
            </p>
            <p className="text-amber-600 mt-1">Be the first to place a bid!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="bg-amber-100 h-12 w-12 rounded-full flex items-center justify-center text-amber-800 font-bold mr-4">
                        {bid.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-800">
                          {bid.userName}
                        </h3>
                        <p className="text-sm text-amber-600">
                          {bid.userEmail}
                        </p>
                      </div>
                    </div>
                    <div className="bg-amber-50 px-3 py-1 rounded-full text-amber-800 font-bold">
                      ${bid.amount}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-amber-600 uppercase">
                        Bid ID
                      </p>
                      <p className="text-sm text-amber-800 font-mono truncate">
                        {bid._id}
                      </p>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-amber-600 uppercase">
                        Task ID
                      </p>
                      <p className="text-sm text-amber-800 font-mono truncate">
                        {bid.taskId}
                      </p>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-amber-600 uppercase">
                        Deadline
                      </p>
                      <p className="text-sm text-amber-800">
                        {new Date(bid.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-amber-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-amber-600 uppercase">
                      Submitted
                    </p>
                    <p className="text-sm text-amber-800">
                      {new Date(bid.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 px-6 py-3 border-t border-amber-100">
                  <p className="text-sm text-amber-700">
                    <span className="font-medium">Message:</span>{" "}
                    {bid.message || "No message provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBids;
