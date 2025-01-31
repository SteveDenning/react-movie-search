import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import AIMedia from "../views/ai-media";

const AIMediaPage = () => {
  const heading = "AI Media";
  const pageDescription = "Explore the possibilities of AI-powered discovery for films and TV shows. Let AI find your next favorite watch!";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <AIMedia />
    </DefaultLayout>
  );
};

export default AIMediaPage;
