import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Favourites from "../views/favourites";

const FavouritesPage = () => {
  return (
    <DefaultLayout heading="Favourites">
      <Favourites />
    </DefaultLayout>
  );
};

export default FavouritesPage;
