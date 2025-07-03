import React from "react";

// Styles
import "./template.scss";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  resource?: any;
}

const Template: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className="template"
      data-testid="template"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Template;
