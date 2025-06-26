export const fetchTasks = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
  return res.json();
};

export const fetchTaskById = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
  return res.json();
};