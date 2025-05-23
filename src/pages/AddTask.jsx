import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const AddTask = () => {
  const { user } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());

    newTask.userEmail = user?.email;
    newTask.userName = user?.displayName;

    fetch("https://freelance-task-marketplace-server-mauve.vercel.app/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Task Created!",
            text: "Your task has been successfully created",
            icon: "success",
            confirmButtonColor: "#f59e0b",
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: "Error!",
          text: "There was an error creating your task",
          icon: "error",
          confirmButtonColor: "#f59e0b",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl roboto text-amber-900 sm:text-5xl">
            Create New Task
          </h2>
          <p className="mt-4 text-xl text-amber-800 roboto">
            Fill in all the details to create your perfect task
          </p>
        </div>

        <div className="bg-amber-50 shadow-2xl rounded-3xl overflow-hidden border-2 border-amber-200">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Image URL Input */}
              <div className="space-y-2">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-amber-900"
                >
                  Task Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all placeholder-amber-600/50"
                  pattern="https://.*"
                />
                <p className="text-xs text-amber-600 mt-1">
                  Provide a URL for an image that represents your task (optional)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Task Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="What needs to be done?"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all placeholder-amber-600/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Priority Level *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="estimatedTime"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Estimated Time (hours)
                  </label>
                  <input
                    type="number"
                    id="estimatedTime"
                    name="estimatedTime"
                    placeholder="e.g. 2.5"
                    min="0"
                    step="0.5"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-amber-900"
                >
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Provide all necessary details about the task..."
                  className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all placeholder-amber-600/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Budget
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      placeholder="0.00"
                      className="block w-full pl-8 px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Initial Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-100/50 transition-all"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-200/50 cursor-not-allowed"
                    value={user?.email}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-amber-900"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-200/50 cursor-not-allowed"
                    value={user?.displayName}
                    readOnly
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;