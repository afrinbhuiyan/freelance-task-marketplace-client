import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { FaCheckCircle, FaCalendarAlt, FaExclamationTriangle, FaArrowLeft, FaHandshake, FaTag, FaUserTie, FaDollarSign, FaChartLine } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiProgress4Line } from "react-icons/ri";

const TaskDetails = () => {
  const { id } = useParams();
  const tasks = useLoaderData();
  const task = tasks.find((task) => task._id === id);
  
  // State for bids
  const [bidsCount, setBidsCount] = useState(0);
  const [hasBidOnThisTask, setHasBidOnThisTask] = useState(false);
  const [showBidSuccess, setShowBidSuccess] = useState(false);

  const handleBid = () => {
    if (!hasBidOnThisTask) {
      setBidsCount(prev => prev + 1);
      setHasBidOnThisTask(true);
      setShowBidSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowBidSuccess(false), 3000);
    }
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <FaExclamationTriangle className="text-3xl text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h1>
          <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or may have been removed.</p>
          <button 
            className="btn btn-primary rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2" /> Return to Tasks
          </button>
        </div>
      </div>
    );
  }

  const completionPercentage = task.completed ? 100 : task.progress || 0;
  const dueDate = new Date(task.dueDate);
  const isOverdue = !task.completed && dueDate < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 mt-40">
      <div className="max-w-5xl mx-auto">
        {/* Bids counter banner */}
        {bidsCount > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-sm flex items-center border border-indigo-200">
            <div className="bg-indigo-500 p-2 rounded-full mr-3">
              <FaHandshake className="text-white text-lg" />
            </div>
            <span className="text-indigo-800 font-medium">
              You've placed {bidsCount} {bidsCount === 1 ? 'bid' : 'bids'} on opportunities
            </span>
          </div>
        )}

        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back to Tasks
          </button>
        </div>

        {/* Main task card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          {/* Task header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{task.title}</h1>
                <div className="flex items-center flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.completed ? 'bg-green-100 text-green-800' : 
                    isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.completed ? 'Completed' : isOverdue ? 'Overdue' : 'Active'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority || 'Normal'} Priority
                  </span>
                </div>
              </div>
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <FaCalendarAlt className="mr-2" />
                <span>Due: {dueDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Task body */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <RiProgress4Line className="mr-2 text-blue-500" />
                Task Description
              </h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {task.description || "No description provided."}
              </p>
            </div>

            {/* Progress section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaChartLine className="mr-2 text-blue-500" />
                  Progress
                </h3>
                <span className="text-gray-700 font-medium">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    completionPercentage < 30 ? 'bg-red-500' :
                    completionPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <FaTag className="text-blue-500 mr-2" />
                  <h4 className="font-semibold text-blue-800">Category</h4>
                </div>
                <p className="text-blue-600">{task.category || "Uncategorized"}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <IoMdTime className="text-purple-500 mr-2" />
                  <h4 className="font-semibold text-purple-800">Time Estimate</h4>
                </div>
                <p className="text-purple-600">{task.estimate || "Not specified"}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <FaUserTie className="text-green-500 mr-2" />
                  <h4 className="font-semibold text-green-800">Assigned To</h4>
                </div>
                <p className="text-green-600">{task.assignedTo || "Unassigned"}</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <FaDollarSign className="text-amber-500 mr-2" />
                  <h4 className="font-semibold text-amber-800">Budget</h4>
                </div>
                <p className="text-amber-600">{task.budget || "Not specified"}</p>
              </div>
            </div>

            {/* Bid success notification */}
            {showBidSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center animate-fade-in">
                <FaCheckCircle className="text-green-600 mr-3 text-xl" />
                <span className="text-green-800 font-medium">
                  Your bid has been successfully submitted!
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-all">
                Edit Task Details
              </button>
              
              <button 
                className={`btn rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-all ${
                  hasBidOnThisTask ? 'btn-success' : 'btn-secondary'
                }`}
                onClick={handleBid}
                disabled={hasBidOnThisTask}
              >
                {hasBidOnThisTask ? (
                  <>
                    <FaCheckCircle className="mr-2" /> Bid Submitted
                  </>
                ) : (
                  <>
                    <FaHandshake className="mr-2" /> Place Bid
                  </>
                )}
              </button>
              
              <button className="btn btn-outline btn-error rounded-lg px-6 py-3">
                Delete Task
              </button>
            </div>
          </div>
        </div>

        {/* Additional details section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <IoMdTime className="mr-2 text-blue-500" />
              Task Timeline
            </h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    1
                  </div>
                  <div className="w-px h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6">
                  <p className="text-gray-500 text-sm">Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(task.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    2
                  </div>
                  <div className="w-px h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6">
                  <p className="text-gray-500 text-sm">Last Updated</p>
                  <p className="font-medium text-gray-800">
                    {new Date(task.updatedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    3
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Due Date</p>
                  <p className={`font-medium ${
                    isOverdue ? 'text-red-600' : 'text-gray-800'
                  }`}>
                    {dueDate.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {isOverdue && (
                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Overdue
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;