import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Views
import Footer from "../../views/footer";
import Header from "../../views/header";
import Seo from "../../components/seo";

// Hocs
import { UserProvider } from "../../hocs/with-user-provider";

interface Props {
  children: React.ReactNode;
  title?: string;
  pageDescription?: string;
  variant?: string;
}

const DefaultLayout: React.FC<Props> = ({ children, title, pageDescription, variant }) => {
  // Class Definitions
  const baseClass = "main-wrapper fade-in";
  const variantClass = `main-wrapper--${variant}`;
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <UserProvider>
      <MUILayout>
        <Seo
          title={title}
          description={pageDescription}
        />
        {title && <Header heading={title} />}
        <main className={classes}>{children}</main>
        <Footer />
      </MUILayout>
    </UserProvider>
  );
};

export default DefaultLayout;
