import React from "react";

// Views
import HomePage from "../views/home-page";
import DetailsView from "../views/details";

const publicRoutes = {
  createRoutes: () => {
    const routes = [];

    routes.push(
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/details/:type/:id",
        element: <DetailsView />,
      },
    );

    return routes;
  },
};

export default publicRoutes;
