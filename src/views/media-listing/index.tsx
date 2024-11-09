import React from "react";

// Layouts
import DefaultLayout from "../../layout/default";

const MediaListing = () => {
  return (
    <DefaultLayout heading="title goes here">
      <div
        className="media-listing"
        data-testid="media-listing"
      ></div>
    </DefaultLayout>
  );
};

export default MediaListing;
