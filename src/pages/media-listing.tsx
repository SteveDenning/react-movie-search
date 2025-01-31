import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import MediaListing from "../views/media-listing";

const MediaListingPage = () => {
  const heading = "Media Listing";
  const pageDescription = "Browse a list of films, TV shows, and actors. Discover and explore your favorite entertainment!";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <MediaListing />
    </DefaultLayout>
  );
};

export default MediaListingPage;
