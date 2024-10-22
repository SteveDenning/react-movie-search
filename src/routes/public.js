import React from "react";
import Home from "../pages/home";
import Details from "../pages/details";

const publicRoutes = {
  createRoutes: () => {
    const routes = [];

    routes.push(
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    );

    return routes;
  },
};

export default publicRoutes;
