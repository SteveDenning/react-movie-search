import React from "react";
import { BrowserRouter } from "react-router-dom";

// Layouts
import MUILayout from "../../layout/mui";

interface Props {
  children: any;
}

const StorybookLayout: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <MUILayout>
        <div style={{ width: "100%", padding: "0 200px", overflow: "hidden" }}>{children}</div>
      </MUILayout>
    </BrowserRouter>
  );
};

export default StorybookLayout;
