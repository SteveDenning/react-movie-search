import React from "react";

// Styles
import "./image.scss";

interface Props {
  children?: React.ReactNode;
}

const Image: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="modal"
      data-testid="modal"
    >
      {children}
    </div>
  );
};

export default Image;
