import React from "react";
import Helmet from "react-helmet";

interface Props {
  description?: string;
  lang?: string;
  keywords?: any[];
  title: string;
}

const Seo: React.FC<Props> = ({
  description = "TMDB Search is a small App designed to give the user the choice to search for TV, Films or Actors",
  lang = "en-gb",
  keywords = ["Movies", "Films", "TV", "TV Shows", "Media search"],
  title = "TMDB Search App",
}) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${title}`}
      meta={[
        {
          name: "description",
          content: description,
        },
      ].concat(
        keywords?.length
          ? {
              name: "keywords",
              content: keywords.join(", "),
            }
          : [],
      )}
    />
  );
};

export default Seo;
