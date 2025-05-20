import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const MyTasks = () => {
  const { user } = use(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/tasks?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        
        // Additional client-side filtering as a safeguard
        const filteredTasks = data.filter(task => task.email === user.email);
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load your tasks',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchTasks();
    }
  }, [user?.email]);

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        setTasks(tasks.filter(task => task._id !== taskId));
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete task',
          icon: 'error'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 mt-28 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-x-auto mt-28 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Posted Tasks</h2>
        <Link to="/post-task" className="btn btn-primary">
          Post New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>You haven't posted any tasks yet.</span>
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>
                    <Link to={`/task/${task._id}`} className="hover:underline font-medium">
                      {task.title}
                    </Link>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {task.category}
                    </span>
                  </td>
                  <td>${task.budget}</td>
                  <td>
                    {new Date(task.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td>
                    <span className={`badge ${
                      task.status === 'completed' ? 'badge-success' :
                      task.status === 'in-progress' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {task.status || 'open'}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <Link to={`/update/${task._id}`} className="btn btn-xs btn-warning">
                      Update
                    </Link>
                    <button 
                      onClick={() => handleDelete(task._id)} 
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                    <Link to={`/bids/${task._id}`} className="btn btn-xs btn-info">
                      Bids ({task.bids?.length || 0})
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTasks;