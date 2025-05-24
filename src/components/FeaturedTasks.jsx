import React, { useEffect, useState } from "react";

const FeaturedTasks = () => {
  const [featuredTasks, setFeaturedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://freelance-task-marketplace-server-mauve.vercel.app/tasks/featured"
    )
      .then((res) => res.json())
      .then((data) => {
        setFeaturedTasks(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Featured Tasks</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featuredTasks.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Featured Tasks</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No featured tasks available at the moment. Check back later!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 pt-12 pb-20 border-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-16">
          <h2 className="text-3xl mb-3 roboto">Featured Tasks</h2>
          <p className="text-gray-600 max-w-2xl roboto">
            Browse through our hand-picked selection of premium tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200">
                    {task.title}
                  </h3>
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {task.description}
                </p>
              </div>

              {/* Skills */}
              {task.skills && task.skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {task.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a1 1 0 01.894.553l1.618 3.276 3.622.527a1 1 0 01.554 1.706l-2.62 2.555.618 3.606a1 1 0 01-1.451 1.054L10 13.347l-3.217 1.69a1 1 0 01-1.451-1.054l.618-3.606-2.62-2.555a1 1 0 01.554-1.706l3.622-.527L9.106 2.553A1 1 0 0110 2z" />
                        </svg>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Section */}
              <div className="text-sm text-gray-500 space-y-1 mb-6">
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span className="font-semibold text-gray-700">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-semibold text-gray-700">
                    ${task.budget?.toLocaleString() || "Negotiable"}
                  </span>
                </div>
              </div>

              <button className="mt-auto w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300">
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
