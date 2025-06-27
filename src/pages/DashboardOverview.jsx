import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [totalTasks, setTotalTasks] = useState(0);
  const [myTasks, setMyTasks] = useState(0);
  const [bidsCount, setBidsCount] = useState(0);
  const [tasksByStatus, setTasksByStatus] = useState({});
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [bidStats, setBidStats] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTotalTasks(data.length);
        const myItems = data.filter((task) => task.userEmail === user?.email);
        setMyTasks(myItems.length);

        // Process task status data
        const statusCounts = myItems.reduce((acc, task) => {
          const status = task.status || "pending";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setTasksByStatus(statusCounts);

        // Process monthly data (mock data for demonstration)
        const monthlyData = [
          { month: "Jan", tasks: Math.floor(Math.random() * 20) + 5 },
          { month: "Feb", tasks: Math.floor(Math.random() * 25) + 8 },
          { month: "Mar", tasks: Math.floor(Math.random() * 30) + 10 },
          { month: "Apr", tasks: Math.floor(Math.random() * 28) + 12 },
          { month: "May", tasks: Math.floor(Math.random() * 35) + 15 },
          { month: "Jun", tasks: myItems.length },
        ];
        setMonthlyTasks(monthlyData);
      });
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_API_URL}/user-task-bids-count?email=${
          user.email
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setBidsCount(data.totalBids);
          setBidStats([
            { label: "Pending", value: Math.floor(data.totalBids * 0.4) },
            { label: "Accepted", value: Math.floor(data.totalBids * 0.3) },
            { label: "Rejected", value: Math.floor(data.totalBids * 0.2) },
            { label: "Completed", value: Math.floor(data.totalBids * 0.1) },
          ]);
        });
    }
  }, [user]);

  // Chart configurations
  const doughnutData = {
    labels: Object.keys(tasksByStatus),
    datasets: [
      {
        data: Object.values(tasksByStatus),
        backgroundColor: [
          "rgba(20, 184, 166, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(147, 51, 234, 0.8)",
        ],
        borderColor: [
          "rgba(20, 184, 166, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(147, 51, 234, 1)",
        ],
        borderWidth: 3,
        hoverOffset: 15,
      },
    ],
  };

  const lineData = {
    labels: monthlyTasks.map((item) => item.month),
    datasets: [
      {
        label: "Tasks Created",
        data: monthlyTasks.map((item) => item.tasks),
        fill: true,
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        borderColor: "rgba(20, 184, 166, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(20, 184, 166, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: bidStats.map((item) => item.label),
    datasets: [
      {
        label: "Bids",
        data: bidStats.map((item) => item.value),
        backgroundColor: [
          "rgba(245, 158, 11, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgba(245, 158, 11, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(20, 184, 166, 1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">Welcome back, {user?.displayName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Items
              </h3>
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-500 rounded"></div>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalTasks}</p>
            <div className="mt-2 flex items-center text-sm text-teal-600">
              <span className="font-medium">+12% from last month</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                My Items
              </h3>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{myTasks}</p>
            <div className="mt-2 flex items-center text-sm text-yellow-600">
              <span className="font-medium">+8% from last month</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Bids
              </h3>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{bidsCount}</p>
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <span className="font-medium">+24% from last month</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -mr-10 -mt-10 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">
                User Profile
              </h3>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-xl font-bold truncate">{user?.displayName}</p>
            <p className="text-sm opacity-80 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Task Status Doughnut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
            Task Status Distribution
          </h3>
          <div className="h-64">
            {Object.keys(tasksByStatus).length > 0 ? (
              <Doughnut data={doughnutData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Tasks Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Monthly Task Trends
          </h3>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bid Statistics Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            Bid Statistics
          </h3>
          <div className="h-64">
            {bidStats.length > 0 ? (
              <Bar data={barData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No bid data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">
                {Math.round((myTasks / totalTasks) * 100) || 0}%
              </p>
              <p className="text-sm opacity-80">Your Task Share</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {bidsCount > 0 ? Math.round(bidsCount / myTasks) || 0 : 0}
              </p>
              <p className="text-sm opacity-80">Avg Bids per Task</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">
                New bid received on your task
              </span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">
                Task completed successfully
              </span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Payment processed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
