import React from "react";

// Views
import HomePage from "../views/home-page";
import DetailsView from "../views/details";
import MediaListing from "../views/media-listing";

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
      {
        path: "/media-listing/",
        element: <MediaListing />,
      },
    );

    return routes;
  },
};

export default publicRoutes;
