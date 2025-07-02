import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Admin from "../views/admin";

const AdminPage = () => {
  const title = "Admin Area";
  const pageDescription = "Admin section for displaying users";

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <Admin />
    </DefaultLayout>
  );
};

export default AdminPage;
