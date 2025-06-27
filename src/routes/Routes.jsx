import { createBrowserRouter } from "react-router";
import mainLayout from "../layout/mainLayout";
import AddTask from "../pages/AddTask";
import TaskDetails from "../pages/TaskDetails";
import BrowseTasks from "../pages/BrowseTasks";
import { lazy, Suspense } from "react";
import { fetchTasks } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardOverview from "../pages/DashboardOverview";
import PrivateRoute from "../provider/PrivateRoute";
import MyTasks from "../pages/MyTasks";
import ViewBids from "../pages/viewBids";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";
import ContactPage from "../pages/ContactPage";
import SupportPage from "../pages/SupportPage";
import DashboardAllTasks from "../components/DashboardAllTasks";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

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
        path: "/browse-tasks",
        Component: BrowseTasks,
        loader: () => fetchTasks(),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/support",
        Component: SupportPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "overview",
        element: <DashboardOverview />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <MyTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/view-bids/:id",
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
        path: "browse-tasks",
        Component: BrowseTasks,
        loader: () => fetchTasks(),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "dashboard/browse-tasks",
        Component: DashboardAllTasks,
        loader: () => fetchTasks(),
        hydrateFallbackElement: <LoadingSpinner />,
      },
    ],
  },
]);

export default router;
