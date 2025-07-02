import React from "react";

// Config
import { config } from "../config/routes";

// Views
import APMediaPage from "../pages/ai-media";
import Admin from "../pages/admin";
import DetailsPage from "../pages/details";
import CreditsPage from "../pages/credits";
import FavoritesPage from "../pages/favorites";
import HomePage from "../pages/home";
import MediaListingPage from "../pages/media-listing";
// import PageNotFound from "../pages/page-not-found";
import SearchResultsPage from "../pages/search-results";
import TermsPage from "../pages/terms";

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
        path: `${config.admin.path}`,
        element: <Admin />,
      },
      {
        path: `${config.aiMedia.path}`,
        element: <APMediaPage />,
      },
      {
        path: `${config.credits.path}/:type/:id/:title/:cast?`,
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
        path: `${config.mediaListing.path}/:type/:media/:period/:title`,
        element: <MediaListingPage />,
      },
      {
        path: `${config.searchResults.path}`,
        element: <SearchResultsPage />,
      },
      {
        path: `${config.terms.path}`,
        element: <TermsPage />,
      },
    );

    return routes;
  },
};

export default routes;
