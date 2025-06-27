import React from "react";
import { useLoaderData } from "react-router-dom";
import TaskCard from "./taskCard";

const DashboardAllTasks = () => {
  const loadedTasks = useLoaderData();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loadedTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default DashboardAllTasks;
