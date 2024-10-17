import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

interface Props {
  children: any;
  variant?: string;
}

const DefaultLayout: React.FC<Props> = ({ children, variant }) => {
  const baseClass = "main-wrapper";
  const variantClass = variant ? `main-wrapper--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <MUILayout>
      <main className={classes}>{children}</main>
    </MUILayout>
  );
};

export default DefaultLayout;
