import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// View
import Terms from "../views/terms";

const TermsPage = () => {
  const pageDescription = "Explore the possibilities of AI-powered discovery for films and TV shows. Let AI find your next favorite watch!";

  return (
    <DefaultLayout
      pageDescription={pageDescription}
      variant="light"
    >
      <Terms />
    </DefaultLayout>
  );
};

export default TermsPage;
