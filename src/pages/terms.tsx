import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// View
import Terms from "../views/terms";

const TermsPage = () => {
  const pageDescription =
    "Our Terms and Conditions outline the rules for using My Movie Database (my-mdb.co.uk). They cover permitted use, intellectual property rights, user responsibilities, and limitations of liability";

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
