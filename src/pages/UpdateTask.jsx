import React, { useState, use} from "react";
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
      const res = await fetch(`https://freelance-task-marketplace-server-mauve.vercel.app/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center">
        <div className="text-amber-900 text-2xl">Updating task...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-800 hover:text-amber-900 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Task
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl roboto text-amber-900 sm:text-5xl">Update Task</h2>
          <p className="mt-4 text-xl text-amber-800 roboto">Modify the details of your task</p>
        </div>

        <div className="bg-amber-50 shadow-2xl rounded-3xl overflow-hidden border-2 border-amber-200">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-amber-900">Task Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={task?.imageUrl}
                  className="block w-full px-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-amber-100/50"
                  pattern="https://.*"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-amber-900">Task Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={task.title}
                    required
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="priority" className="block text-sm font-medium text-amber-900">Priority Level *</label>
                  <select
                    id="priority"
                    name="priority"
                    defaultValue={task.priority}
                    required
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
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
                  <label htmlFor="category" className="block text-sm font-medium text-amber-900">Category *</label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={task.category}
                    required
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
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
                  <label htmlFor="deadline" className="block text-sm font-medium text-amber-900">Deadline *</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    defaultValue={task.deadline}
                    required
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="estimatedTime" className="block text-sm font-medium text-amber-900">Estimated Time (hours)</label>
                  <input
                    type="number"
                    id="estimatedTime"
                    name="estimatedTime"
                    defaultValue={task.estimatedTime}
                    step="0.5"
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-amber-900">Detailed Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  defaultValue={task.description}
                  className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-medium text-amber-900">Budget</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">$</span>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      defaultValue={task.budget}
                      step="0.01"
                      className="pl-8 block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-amber-900">Status</label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={task.status}
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-100/50"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-amber-900">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    readOnly
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-200/50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-amber-900">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user?.displayName}
                    readOnly
                    className="block w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-200/50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
