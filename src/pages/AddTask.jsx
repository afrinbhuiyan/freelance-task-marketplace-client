import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const AddTask = () => {
  const { user } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());

    console.log(newTask);

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  return (
    <div className="mt-60 min-h-screen">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add a New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="input input-bordered w-full"
            required
          />
          <select
            name="category"
            className="input input-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
          <textarea
            name="description"
            placeholder="Task Description"
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="date"
            name="deadline"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={user?.email}
            readOnly
          />
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={user?.displayName}
            readOnly
          />
          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
