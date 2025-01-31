import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Components
import Button from "../components/button";

// Assets
import backgroundImage from "../assets/images/404.png";

const PageNotFound = () => {
  const heading = "404 - Page not found";
  const pageDescription = "404 Not Found - The page you are looking for does not exist. Return home or explore other content.";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <div
        data-testid="page-not-found"
        className="page-not-found"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "60vh",
          }}
        >
          <img
            src={backgroundImage}
            alt="Page not found"
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <Button href="/">Go back home</Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PageNotFound;
