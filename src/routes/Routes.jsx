import { createBrowserRouter } from "react-router";
import mainLayout from "../layout/mainLayout";
import PrivateRoute from "../provider/PrivateRoute";
import AddTask from "../pages/AddTask";
import MyTasks from "../pages/MyTasks";
import TaskDetails from "../pages/TaskDetails";
import UpdateTask from "../pages/UpdateTask";
import BrowseTasks from "../pages/BrowseTasks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ViewBids from "../pages/viewBids";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tasks",
        element: (
          <PrivateRoute>
            <MyTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tasks/:id",
        loader: () => fetch("https://freelance-task-marketplace-server-mauve.vercel.app/tasks"),
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-task/:id",
        loader: ({ params }) => fetch(`https://freelance-task-marketplace-server-mauve.vercel.app/tasks/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/view-bids/:id",
        loader: ({ params }) => fetch(`https://freelance-task-marketplace-server-mauve.vercel.app/tasks/${params.id}`),
        element: (
          <PrivateRoute>
            <ViewBids></ViewBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tasks",
        Component: BrowseTasks,
        loader: () => fetch("https://freelance-task-marketplace-server-mauve.vercel.app/tasks"),
      },
    ],
  },
]);

export default router;
