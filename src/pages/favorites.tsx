import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Favorites from "../views/favorites";

const FavoritesPage = () => {
  const heading = "Favourites";
  const pageDescription = "View your favorites list of saved TV shows, films, and actors. Easily access and manage your top picks!";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <Favorites />
    </DefaultLayout>
  );
};

export default FavoritesPage;
