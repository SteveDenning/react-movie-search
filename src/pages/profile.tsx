import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import Profile from "../views/profile";

const ProfilePage = () => {
  return (
    <DefaultLayout
      hasSearch
      heading="Profile"
    >
      <Profile />
    </DefaultLayout>
  );
};

export default ProfilePage;
