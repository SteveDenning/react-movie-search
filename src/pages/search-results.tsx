import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import SearchResults from "../views/search-results";

const PageNotFound = () => {
  return (
    <DefaultLayout heading="Search Results">
      <SearchResults />
    </DefaultLayout>
  );
};

export default PageNotFound;
