import React from "react";

// Styles
import "./template.scss";

interface Props {
  children?: React.ReactNode;
}

const Template: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="template"
      data-testid="template"
    >
      {children}
    </div>
  );
};

export default Template;
