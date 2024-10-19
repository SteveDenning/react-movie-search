import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Components
import Footer from "../../components/footer";
import Header from "../../components/header";

// Pages
import MovieSearch from "../../pages/movie-search";

interface Props {
  variant?: string;
}

const DefaultLayout: React.FC<Props> = () => {
  return (
    <MUILayout>
      {/* SEO goes here */}
      <Header />
      <main className="main-wrapper">
        <MovieSearch />
      </main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
