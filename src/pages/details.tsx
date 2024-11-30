import React from "react";

// Layout
import DefaultLayout from "../layout/default";
import Details from "../views/details";

const DetailsPage = () => {
  return (
    <DefaultLayout heading="Media details">
      <Details />
    </DefaultLayout>
  );
};
export default DetailsPage;
