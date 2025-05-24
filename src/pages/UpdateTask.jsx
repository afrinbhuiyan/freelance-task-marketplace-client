import React, { useState, use } from "react";
import { useNavigate, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";

const UpdateTask = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const task = useLoaderData();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedTask = {
      imageUrl: form.imageUrl.value,
      title: form.title.value,
      priority: form.priority.value,
      category: form.category.value,
      deadline: form.deadline.value,
      estimatedTime: form.estimatedTime.value,
      description: form.description.value,
      budget: form.budget.value,
      status: form.status.value,
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const res = await fetch(
        `https://freelance-task-marketplace-server-mauve.vercel.app/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        Swal.fire("Success!", "Task updated successfully.", "success");
        navigate("/my-tasks");
      } else {
        Swal.fire("No Changes", "No updates were made to the task.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update task.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-800 hover:text-amber-900 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Task
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl roboto sm:text-5xl">Update Task</h2>
          <p className="mt-4 text-xl roboto">Modify the details of your task</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12 border border-gray-200">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Create a New Task
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Fill out the form below to post your freelance task.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="imageUrl"
                className="block mb-1 font-medium text-sm text-gray-700"
              >
                Task Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                defaultValue={task?.imageUrl}
                pattern="https://.*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: A visual image link for your task.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={task.title}
                  placeholder="e.g. Build a React app"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Priority Level *
                </label>
                <select
                  id="priority"
                  name="priority"
                  defaultValue={task.priority}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
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
              <div>
                <label
                  htmlFor="category"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={task.category}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
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

              <div>
                <label
                  htmlFor="deadline"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  defaultValue={task.deadline}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="estimatedTime"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Estimated Time (hours)
                </label>
                <input
                  type="number"
                  id="estimatedTime"
                  name="estimatedTime"
                  defaultValue={task.estimatedTime}
                  step="0.5"
                  min="0"
                  placeholder="e.g. 4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-medium text-sm text-gray-700"
              >
                Task Description *
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={task.description}
                rows="5"
                placeholder="Describe the task in detail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="budget"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    defaultValue={task.budget}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Initial Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={task.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 font-medium text-sm text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user?.displayName}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold rounded-lg text-sm shadow-md"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
