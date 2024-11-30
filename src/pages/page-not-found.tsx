import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Assets
import backgroundImage from "../assets/images/404.png";

const PageNotFound = () => {
  return (
    <DefaultLayout heading="404 - Page not found">
      <div
        data-testid="details-view"
        className="details-view"
        style={{ backgroundImage: backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
      ></div>
    </DefaultLayout>
  );
};

export default PageNotFound;
