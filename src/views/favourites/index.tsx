import React from "react";

// Styles
import "./favourites.scss";

interface Props {
  children?: React.ReactNode;
}

const Favourites: React.FC<Props> = () => {
  return (
    <div
      className="favourites"
      data-testid="favourites"
    >
      <h1>Favourites</h1>
    </div>
  );
};

export default Favourites;
