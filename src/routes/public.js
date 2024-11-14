import React from "react";

// Config
import { config } from "../config/routes";

// Views
import HomePage from "../pages/home";
import DetailsPage from "../pages/details";
import MediaListing from "../pages/media-listing";
import PageNotFound from "../pages/page-not-found";
import SearchResultsPage from "../pages/search-results";

const routes = {
  createRoutes: () => {
    const routes = [];

    routes.push(
      {
        path: "/",
        element: <HomePage />,
        errorElement: <PageNotFound />,
      },
      {
        path: config.searchResults.path,
        element: <SearchResultsPage />,
      },
      {
        path: `${config.details.path}/:type/:id`,
        element: <DetailsPage />,
      },
      {
        path: config.mediaListing.path,
        element: <MediaListing />,
      },
    );

    return routes;
  },
};

export default routes;
