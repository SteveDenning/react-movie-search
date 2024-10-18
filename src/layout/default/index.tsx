import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Components
import Footer from "../../components/footer";

// Views
import MovieSearch from "../../views/movie-search";

interface Props {
  variant?: string;
}

const DefaultLayout: React.FC<Props> = () => {
  return (
    <MUILayout>
      {/* SEO goes here */}
      <header>Header goes here</header>
      <main className="main-wrapper">
        <MovieSearch />
      </main>
      <Footer />
    </MUILayout>
  );
};

export default DefaultLayout;
