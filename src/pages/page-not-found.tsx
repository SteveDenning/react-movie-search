import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Components
import Button from "../components/button";

// Assets
import backgroundImage from "../assets/images/404.png";

const PageNotFound = () => {
  return (
    <DefaultLayout heading="404 - Page not found">
      <div
        data-testid="page-not-found"
        className="page-not-found"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Button href="/">Go back home</Button>
      </div>
    </DefaultLayout>
  );
};

export default PageNotFound;
