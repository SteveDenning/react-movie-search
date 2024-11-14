import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Routes config
// import { config } from "../config/routes";

const PageNotFound = () => {
  // const pageTitle = config.public.pageNotFound.name;

  return (
    <DefaultLayout heading={"pageTitle"}>
      <h1>TODO - Eh Up, page not found</h1>
    </DefaultLayout>
  );
};

export default PageNotFound;
