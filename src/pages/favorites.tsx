import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Favorites from "../views/favorites";

const FavoritesPage = () => {
  return (
    <DefaultLayout heading="Favorites">
      <Favorites />
    </DefaultLayout>
  );
};

export default FavoritesPage;
