import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import SearchResults from "../views/search-results";

const SearchResultsPage = () => {
  const heading = "Search Results";
  const pageDescription = "View a list of results based on your search criteria. Find films, TV shows, and actors that match your query!";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <SearchResults />
    </DefaultLayout>
  );
};

export default SearchResultsPage;
