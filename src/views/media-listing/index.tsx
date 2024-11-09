import DefaultLayout from "../../layout/default";
import React from "react";

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
