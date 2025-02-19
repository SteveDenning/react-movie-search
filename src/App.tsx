import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./firebase";

// Routes
import routes from "./routes/public";

const App = () => {
  const router = createBrowserRouter(routes.createRoutes());

  return <RouterProvider router={router} />;
};

export default App;
