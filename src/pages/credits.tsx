import React, { useState } from "react";

// Layout
import DefaultLayout from "../layout/default";
import Credits from "../views/credits";

const CreditsPage = () => {
  const [title, setTitle] = useState<string>("");
  const pageDescription =
    "Details of the selectView details of selected media, including films, TV shows, or actors. Explore in-depth information on your favorites!ed media of either Film, TV Show or Actor";

  const handleMediaTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <Credits handleMediaTitle={handleMediaTitle} />
    </DefaultLayout>
  );
};
export default CreditsPage;
