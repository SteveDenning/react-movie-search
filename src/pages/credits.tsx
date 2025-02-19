import React, { useState } from "react";

// Layout
import DefaultLayout from "../layout/default";
import Credits from "../views/credits";

const CreditsPage = () => {
  const [title, setTitle] = useState<string>("");
  const pageDescription = `Meet cast and crew from ${title} and discover the roles they played in the production.`;

  const handleMediaTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <DefaultLayout
      title={`${title} - Cast and Crew`}
      pageDescription={pageDescription}
    >
      <Credits handleMediaTitle={handleMediaTitle} />
    </DefaultLayout>
  );
};
export default CreditsPage;
