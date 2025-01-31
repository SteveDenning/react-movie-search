import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Views
import Footer from "../../views/footer";
import Header from "../../views/header";
import Seo from "../../components/seo";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription?: string;
}

const DefaultLayout: React.FC<Props> = ({ children, title, pageDescription }) => {
  return (
    <MUILayout>
      <Seo
        title={title}
        description={pageDescription}
      />
      <Header heading={title} />
      <main className="main-wrapper fade-in">{children}</main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
