import React from "react";

// Styles
import "./card.scss";

interface Props {
  children?: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="card"
      data-testid="card"
    >
      {children}
    </div>
  );
};

export default Card;
