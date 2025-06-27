import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaHandshake, FaEye } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";
import TaskEditModal from "../components/TaskEditModal";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        });
    }
  }, [userEmail]);

  console.log(tasks);

  const handleDelete = (task) => {
    Swal.fire({
      title: "Delete this task?",
      html: `
        <div class="text-left">
          <p class="mb-2">You're about to delete:</p>
          <p class="font-bold text-teal-900">${task.title}</p>
          <div class="flex items-center mt-4">
            <div class="w-16 h-16 bg-teal-100 flex items-center justify-center rounded-md mr-4 text-teal-600 font-bold text-xl">
              ${task.title.charAt(0)}
            </div>
            <div>
              <p class="flex items-center"><span class="mr-1">Price:</span> $${task.price}</p>
              <p class="flex items-center"><span class="mr-1">Deadline:</span> ${task.deadline}</p>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#E53E3E",
      cancelButtonColor: "#38B2AC",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      background: "#F7FAFC",
      customClass: {
        popup: "rounded-lg border-2 border-teal-200",
        title: "text-2xl font-bold text-teal-800",
        htmlContainer: "text-gray-700",
        confirmButton: "px-6 py-2 rounded-md font-medium",
        cancelButton: "px-6 py-2 rounded-md font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/tasks/${task._id}`,
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
              confirmButtonColor: "#38B2AC",
              background: "#F7FAFC",
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
            confirmButtonColor: "#38B2AC",
          });
        }
      }
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-teal-100 text-teal-800",
      cancelled: "bg-red-100 text-red-800",
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 md:py-6 px-4 sm:px-6 lg:px-0">
      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            setTasks((prev) =>
              prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
            );
          }}
        />
      )}
      
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track all your tasks in one place</p>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Get started by creating your first task!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-teal-700 font-semibold text-sm">
                              {task.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {task.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          <p className="line-clamp-2">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          ${task.budget}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50 transition-colors"
                            title="Edit task"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(task)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete task"
                          >
                            <FaTrash size={14} />
                          </button>
                          <Link
                            to={`/dashboard/view-bids/${task._id}`}
                            className="text-teal-600 hover:text-teal-800 p-2 rounded-md hover:bg-teal-50 transition-colors"
                            title="View bids"
                          >
                            <FaHandshake size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div key={task._id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <span className="text-teal-700 font-semibold text-sm">
                            {task.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm font-semibold text-green-600">
                              ${task.price}
                            </span>
                            {getStatusBadge(task.status)}
                          </div>
                          {task.deadline && (
                            <p className="text-xs text-gray-400 mt-1">
                              Due: {new Date(task.deadline).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(task)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50"
                        >
                          <FaTrash size={14} />
                        </button>
                        <Link
                          to={`/dashboard/view-bids/${task._id}`}
                          className="text-teal-600 hover:text-teal-800 p-2 rounded-md hover:bg-teal-50"
                        >
                          <FaHandshake size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{tasks.length}</div>
                <div className="text-sm text-gray-500">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${tasks.reduce((sum, task) => sum + (parseFloat(task.price) || 0), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {tasks.filter(task => task.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">
                  {tasks.filter(task => task.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;