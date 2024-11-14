import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import SearchResults from "../views/search-results";

// Routes config
// import { config } from "../config/routes";

const PageNotFound = () => {
  // const pageTitle = config.public.pageNotFound.name;

  return (
    <DefaultLayout heading={"Search Results"}>
      <SearchResults />
    </DefaultLayout>
  );
};

export default PageNotFound;
