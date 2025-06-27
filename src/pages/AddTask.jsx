import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    console.log("AddTask mounted");
    console.log("User:", user);
    if (user?.photoURL) {
      setUserAvatar(user.photoURL);
    }
  }, [user]);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());

    newTask.userEmail = user?.email;
    newTask.userName = user?.displayName;
    newTask.userAvatar = userAvatar;
    newTask.createdAt = new Date().toISOString();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Task Created!",
          text: "Your task has been successfully created",
          icon: "success",
          confirmButtonColor: "#f59e0b",
        });
        form.reset();
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error creating your task",
        icon: "error",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-25 to-white pb-20 px-4 sm:px-6 lg:px-0">
      <div className="">
        {/* Premium Card Container */}
        <div className="overflow-hidden">
          {/* Header with Teal Accent */}
          <div className=" px-10 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-teal-600">Create New Task</h1>
                <p className="mt-2 text-teal-600 font-light">
                  Complete all required fields to post your opportunity
                </p>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dual Column Form Layout */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-8 p-10">
            {/* Left Column */}
            <div className="space-y-8 border-r-0 xl:border-r border-teal-100 pr-0 xl:pr-8">
              {/* Task Visual Section */}
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-teal-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Task Visual
                  </h3>
                  <span className="text-xs text-teal-500 bg-white px-2 py-1 rounded">Optional</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <input
                      type="url"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Paste a URL to an image related to your task</p>
                  </div>
                  <div className="w-32 h-32 bg-white rounded-lg border-2 border-dashed border-teal-200 flex items-center justify-center overflow-hidden shadow-sm">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="object-cover w-full h-full" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Task Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-800 border-b border-teal-100 pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Core Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Website Redesign"
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Priority *</label>
                    <div className="relative">
                      <select
                        name="priority"
                        className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none bg-white"
                        required
                      >
                        <option value="">Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Category *</label>
                    <div className="relative">
                      <select
                        name="category"
                        className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none bg-white"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Design">Design</option>
                        <option value="Writing">Writing</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Research">Research</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Deadline *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="deadline"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-teal-700">Description *</label>
                <textarea
                  name="description"
                  rows={6}
                  placeholder="Provide detailed requirements, deliverables, and any special instructions..."
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                  required
                />
                <p className="text-xs text-gray-500">Minimum 50 characters</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 mt-8 xl:mt-0">
              {/* Budget & Timeline */}
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Budget & Timeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Budget</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-teal-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="budget"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="pl-8 w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-teal-400 text-sm">USD</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">Estimated Hours</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="estimatedTime"
                        placeholder="e.g. 40"
                        min="1"
                        className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-teal-400 text-sm">hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-teal-700 mb-1">Status</label>
                  <select
                    name="status"
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Client Information */}
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center bg-white px-4 py-3 rounded-lg border border-teal-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-teal-500">Email</p>
                      <p className="text-sm font-medium text-teal-700">{user?.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white px-4 py-3 rounded-lg border border-teal-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-xs text-teal-500">Name</p>
                      <p className="text-sm font-medium text-teal-700">{user?.displayName || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Panel */}
              <div className="bg-white p-6 rounded-xl border border-teal-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-teal-700">Ready to post your task?</h4>
                    <p className="text-xs text-teal-500 mt-1">Review all details before submitting</p>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
                  >
                    Post Task
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;