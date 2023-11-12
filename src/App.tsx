import { Suspense, lazy } from "react";

import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index/index"));
const Login = lazy(() => import("./pages/Login/login"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback="...">
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        Component: Index,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}

export default Routes;
