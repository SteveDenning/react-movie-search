import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import MediaListing from "../views/media-listing";

const MediaListingPage = () => {
  return (
    <DefaultLayout heading="Media Listing Page">
      <MediaListing />
    </DefaultLayout>
  );
};

export default MediaListingPage;
