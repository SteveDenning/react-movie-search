import React from "react";

// Config
import { config } from "../config/routes";

// Views
import APMediaPage from "../pages/ai-media";
import DetailsPage from "../pages/details";
import CreditsPage from "../pages/credits";
import FavoritesPage from "../pages/favorites";
import HomePage from "../pages/home";
import MediaListingPage from "../pages/media-listing";
import PageNotFound from "../pages/page-not-found";
import ProfilePage from "../pages/profile";
import SearchResultsPage from "../pages/search-results";

const routes = {
  createRoutes: () => {
    const routes = [];

    routes.push(
      {
        path: "/",
        element: <HomePage />,
        // errorElement: <PageNotFound />,
      },
      {
        path: `${config.aiMedia.path}`,
        element: <APMediaPage />,
      },
      {
        path: `${config.credits.path}/:type/:id/:title`,
        element: <CreditsPage />,
      },
      {
        path: `${config.details.path}/:type/:id`,
        element: <DetailsPage />,
      },
      {
        path: `${config.favorites.path}`,
        element: <FavoritesPage />,
      },
      {
        path: `${config.mediaListing.path}/:type/:media/:title`,
        element: <MediaListingPage />,
      },
      {
        path: `${config.profile.path}`,
        element: <ProfilePage />,
      },
      {
        path: `${config.searchResults.path}`,
        element: <SearchResultsPage />,
      },
    );

    return routes;
  },
};

export default routes;
