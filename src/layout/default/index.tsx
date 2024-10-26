import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Views
import Footer from "../../views/footer";
// import Header from "../../views/header";

interface Props {
  children?: any;
  heading: string;
}

const DefaultLayout: React.FC<Props> = ({ children, heading = "Movie Search" }) => {
  return (
    <MUILayout>
      {/* SEO goes here */}
      {/* <Header heading={heading} /> */}
      <main className="main-wrapper">{children}</main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
