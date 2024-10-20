import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Components
import Footer from "../../components/footer";
import Header from "../../components/header";

interface Props {
  children?: any;
  heading: string;
}

const DefaultLayout: React.FC<Props> = ({ children, heading }) => {
  return (
    <MUILayout>
      {/* SEO goes here */}
      <Header heading={heading} />
      <main className="main-wrapper">{children}</main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
