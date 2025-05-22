import React, { useState, useEffect, use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaHandshake, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";

const MyTasks = () => {
  const { user } = use(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:3000/tasks?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data)
          setLoading(false)
        });
    }
  }, [userEmail]);

  const handleDelete = (task) => {
    Swal.fire({
      title: "Delete this task?",
      html: `
        <div class="text-left">
          <p class="mb-2">You're about to delete:</p>
          <p class="font-bold text-[#331A15]">${task.title}</p>
          <div class="flex items-center mt-4">
            <div class="w-16 h-16 bg-amber-100 flex items-center justify-center rounded-md mr-4 text-amber-600 font-bold text-xl">
              ${task.title.charAt(0)}
            </div>
            <div>
              <p class="flex items-center"><span class="mr-1">Price:</span> $${
                task.price
              }</p>
              <p class="flex items-center"><span class="mr-1">Deadline:</span> ${
                task.deadline
              }</p>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#EA4744",
      cancelButtonColor: "#D2B48C",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      background: "#F5F4F1",
      customClass: {
        popup: "rounded-lg border-2 border-[#D2B48C]",
        title: "text-2xl font-rancho text-[#331A15]",
        htmlContainer: "text-[#5C3A21]",
        confirmButton: "px-6 py-2 rounded-md font-medium",
        cancelButton: "px-6 py-2 rounded-md font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:3000/tasks/${task._id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: `${task.title} has been removed.`,
              icon: "success",
              confirmButtonColor: "#D2B48C",
              background: "#F5F4F1",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setTasks(tasks.filter((t) => t._id !== task._id));
          } else {
            throw new Error(data.message || "Failed to delete task");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#f59e0b",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center">
        <div className="text-amber-900 text-2xl">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="flex items-center text-amber-800 hover:text-amber-900"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-amber-900">My Posted Tasks</h1>
          <Link
            to="/add-task"
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Add New Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-amber-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No tasks posted yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't posted any tasks yet. Click the button below to
                create your first task.
              </p>
              <Link
                to="/add-task"
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Create Your First Task
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-200">
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="hover:bg-amber-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                            {task.title.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {task.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${task.price || "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {task.status || "Not Started"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/update-task/${task._id}`}
                            className="text-amber-600 hover:text-amber-800 p-2 rounded hover:bg-amber-100 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(task)}
                            className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/view-bids/${task._id}`}
                            className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-100 transition-colors"
                            title="View Bids"
                          >
                            <FaHandshake />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
