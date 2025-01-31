import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Profile from "../views/profile";

const ProfilePage = () => {
  const heading = "Profile Page";
  const pageDescription = "";

  return (
    <DefaultLayout
      heading={heading}
      pageDescription={pageDescription}
    >
      <Profile />
    </DefaultLayout>
  );
};

export default ProfilePage;
