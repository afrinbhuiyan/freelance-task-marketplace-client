import { createBrowserRouter } from "react-router";
import mainLayout from "../layout/mainLayout";
import PrivateRoute from "../provider/PrivateRoute";
import AddTask from "../pages/AddTask";
import MyTasks from "../pages/MyTasks";
import TaskDetails from "../pages/TaskDetails";
import UpdateTask from "../pages/UpdateTask";
import BrowseTasks from "../pages/BrowseTasks";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
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
        element: (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            }
          >
            <Signup />
          </Suspense>
        ),
      },
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
        loader: () =>
          fetch(
            "https://freelance-task-marketplace-server-v2ix.vercel.app/tasks"
          ),
        hydrateFallbackElement: (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ),
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-task/:id",
        loader: ({ params }) =>
          fetch(
            `https://freelance-task-marketplace-server-v2ix.vercel.app/tasks/${params.id}`
          ),
        hydrateFallbackElement: (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ),
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/view-bids/:id",
        loader: ({ params }) =>
          fetch(
            `https://freelance-task-marketplace-server-v2ix.vercel.app/tasks/${params.id}`
          ),
        hydrateFallbackElement: (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ),
        element: (
          <PrivateRoute>
            <ViewBids></ViewBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tasks",
        Component: BrowseTasks,
        loader: async () => {
          const res = await fetch(
            "https://freelance-task-marketplace-server-v2ix.vercel.app/tasks"
          );
          return res.json();
        },
        hydrateFallbackElement: (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ),
      },
    ],
  },
]);

export default router;
