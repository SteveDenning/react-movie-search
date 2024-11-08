import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Views
import Footer from "../../views/footer";
import Header from "../../views/header";

interface Props {
  children?: any;
  heading?: string;
  hasSearch?: boolean;
}

const DefaultLayout: React.FC<Props> = ({ children, heading, hasSearch }) => {
  return (
    <MUILayout>
      {/* SEO goes here */}
      <Header
        heading={heading}
        hasSearch={hasSearch}
      />
      <main className="main-wrapper">{children}</main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
