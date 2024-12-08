import React from "react";
import { BrowserRouter } from "react-router-dom";

// Layouts
import MUILayout from "../../layout/mui";

interface Props {
  children?: React.ReactNode;
}

const StorybookLayout: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <MUILayout>{children}</MUILayout>
    </BrowserRouter>
  );
};

export default StorybookLayout;
