import React from "react";

// Styles
import "./profile.scss";

interface Props {
  children?: React.ReactNode;
}

import pageUnderConstruction from "../../assets/images/under-construction.jpg";

const Profile: React.FC<Props> = () => {
  return (
    <div
      className="profile"
      data-testid="profile"
    >
      <img
        style={{ width: "100%" }}
        src={pageUnderConstruction}
        alt="Under Construction image"
      />
    </div>
  );
};

export default Profile;
