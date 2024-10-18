import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Components
import Footer from "../../components/footer";

// Views
import MovieSearch from "../../views/movie-search";
import Header from "../../components/header";

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
