import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import publicRoutes from "./routes/public";

const App = () => {
  const router = createBrowserRouter(publicRoutes.createRoutes());

  return <RouterProvider router={router} />;
};

export default App;
