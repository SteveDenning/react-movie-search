import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import MediaListing from "../views/media-listing";

const MediaListingPage = () => {
  return (
    <DefaultLayout heading="The Movie Seeker: React App for All Things Cinema">
      <MediaListing />
    </DefaultLayout>
  );
};

export default MediaListingPage;
