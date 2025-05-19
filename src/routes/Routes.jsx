import { createBrowserRouter } from "react-router";
import mainLayout from "../layout/mainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout
  },
]);

export default router;
