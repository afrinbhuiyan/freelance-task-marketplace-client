import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import Bg from "../assets/loginBackround.png";

const AddTask = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());

    newTask.userEmail = user?.email;
    newTask.userName = user?.displayName;
    newTask.userAvatar = user?.photoURL;
    
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
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "There was an error creating your task",
          icon: "error",
          confirmButtonColor: "#f59e0b",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 md:px-8 lg:px-20 my-10">
      <div className="max-w-4xl mx-auto">
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

export default AddTask;
