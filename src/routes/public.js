import React from "react";

// Config
import { config } from "../config/routes";

// Views
import HomePage from "../pages/home";
import DetailsPage from "../pages/details";
import MediaListingPage from "../pages/media-listing";
import PageNotFound from "../pages/page-not-found";
import SearchResultsPage from "../pages/search-results";
import FavouritesPage from "../pages/favourites";
import ProfilePage from "../pages/profile";

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
        path: `${config.searchResults.path}`,
        element: <SearchResultsPage />,
      },
      {
        path: `${config.details.path}/:type/:id`,
        element: <DetailsPage />,
      },
      {
        path: `${config.mediaListing.path}/:type/:media`,
        element: <MediaListingPage />,
      },
      {
        path: `${config.favourites.path}`,
        element: <FavouritesPage />,
      },
      {
        path: `${config.profile.path}`,
        element: <ProfilePage />,
      },
    );

    return routes;
  },
};

export default routes;
