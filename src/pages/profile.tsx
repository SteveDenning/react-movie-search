import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Profile from "../views/profile";

const ProfilePage = () => {
  const title = "Profile Page";
  const pageDescription = "";

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <Profile />
    </DefaultLayout>
  );
};

export default ProfilePage;
