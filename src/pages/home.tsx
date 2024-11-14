import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import UserHomePage from "../views/home";

const HomePage = () => {
  return (
    <DefaultLayout
      hasSearch
      heading="The Movie Seeker: React App for All Things Cinema"
    >
      <UserHomePage />
    </DefaultLayout>
  );
};

export default HomePage;
