import React, { useEffect, useState } from "react";

const FeaturedTasks = () => {
  const [featuredTasks, setFeaturedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    fetch("http://localhost:3000/tasks/featured")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
        setError(error.massage)
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        <span className="ml-3 text-gray-600">Loading featured tasks...</span>
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
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">No featured tasks available at the moment. Check back later!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-12 border-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Tasks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our hand-picked selection of premium tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTasks.map((task) => (
            <div 
              key={task._id} 
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Yellow accent bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
              
              {/* Card content */}
              <div className="bg-white p-6 h-full">
                <div className="flex items-start mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-3">{task.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Deadline:
                    </span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Budget:
                    </span>
                    <span className="text-sm font-semibold text-yellow-600">
                      ${task.budget?.toLocaleString() || "Negotiable"}
                    </span>
                  </div>
                </div>
                
                {task.skills && task.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {task.skills.slice(0, 4).map((skill) => (
                        <span 
                          key={skill} 
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg">
                  View Details
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;