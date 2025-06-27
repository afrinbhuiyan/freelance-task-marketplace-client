import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const TaskEditModal = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...task });
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Task updated successfully.",
          icon: "success",
          confirmButtonColor: "#38B2AC",
          background: "#F7FAFC",
        });
        onUpdate(formData);
      } else {
        Swal.fire({
          title: "No Changes",
          text: "No updates were made to the task.",
          icon: "info",
          confirmButtonColor: "#38B2AC",
          background: "#F7FAFC",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update task.",
        icon: "error",
        confirmButtonColor: "#38B2AC",
        background: "#F7FAFC",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1111114f] bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-teal-800">Edit Task</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="imageUrl"
                className="block mb-1 font-medium text-sm text-teal-700"
              >
                Task Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                pattern="https://.*"
                className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: A visual image link for your task.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Build a React app"
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Priority Level *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
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
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
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
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="estimatedTime"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Estimated Time (hours)
                </label>
                <input
                  type="number"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime || ""}
                  onChange={handleChange}
                  step="0.5"
                  min="0"
                  placeholder="e.g. 4"
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-medium text-sm text-teal-700"
              >
                Task Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the task in detail..."
                className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7 w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 font-medium text-sm text-teal-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-teal-200 rounded-lg text-teal-700 hover:bg-teal-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 transition text-white font-medium rounded-lg shadow-md"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;