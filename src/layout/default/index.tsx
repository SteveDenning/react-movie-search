import React from "react";

// Layouts
import MUILayout from "../mui";

// Styles
import "./default.scss";

// Components
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
        <MovieSearch></MovieSearch>
      </main>
      <footer>Footer goes here</footer>
    </MUILayout>
  );
};

export default DefaultLayout;
