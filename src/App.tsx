import { lazy } from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Index = lazy(() => import("./pages/index"));

const routes = createBrowserRouter([
  {
    index: true,
    Component: Index,
  },
]);

function Routes() {
  return <RouterProvider router={routes} />;
}

export default Routes;
