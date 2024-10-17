import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

interface Props {
  variant?: string;
}

const DefaultLayout: React.FC<Props> = ({ variant }) => {
  const baseClass = "main-wrapper";
  const variantClass = variant ? `main-wrapper--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <MUILayout>
      <main className={classes}>Some Text</main>
    </MUILayout>
  );
};

export default DefaultLayout;
