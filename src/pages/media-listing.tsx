import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import MediaListing from "../views/media-listing";

const MediaListingPage = () => {
  const title = "Media Listing";
  const pageDescription = "Browse a list of films, TV shows, and actors. Discover and explore your favorite entertainment!";

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <MediaListing />
    </DefaultLayout>
  );
};

export default MediaListingPage;
