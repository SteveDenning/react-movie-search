import React from "react";

// Styles
import "./test.scss";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  resource?: any;
}

const Test: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className="test"
      data-testid="test"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Test;
