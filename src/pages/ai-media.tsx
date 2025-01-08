import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import AIMedia from "../views/ai-media";

const AIMediaPage = () => {
  return (
    <DefaultLayout
      hasSearch
      heading="AI Media generated just for you"
    >
      <AIMedia />
    </DefaultLayout>
  );
};

export default AIMediaPage;
