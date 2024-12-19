import React from "react";

// Styles
import "./profile.scss";

interface Props {
  children?: React.ReactNode;
}

const Profile: React.FC<Props> = () => {
  return (
    <div
      className="profile"
      data-testid="profile"
    >
      <h1>Profile page</h1>
    </div>
  );
};

export default Profile;
