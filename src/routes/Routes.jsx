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
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchTasks } from "../utils/api";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    loader: () => fetchTasks(),
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
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
        loader: () => fetchTasks(),
        hydrateFallbackElement: <LoadingSpinner />,
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-task/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/tasks/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/view-bids/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/tasks/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        element: (
          <PrivateRoute>
            <ViewBids></ViewBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tasks",
        Component: BrowseTasks,
        loader: () => fetchTasks(),
        hydrateFallbackElement: <LoadingSpinner />,
      },
    ],
  },
]);

export default router;
