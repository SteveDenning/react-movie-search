import React, { useEffect, useState } from "react";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// MUI
import { Container, Fade, Typography } from "@mui/material";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [resources, setResources] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(sessionStorage.getItem("query"));

  const handleSearchInput = () => {
    sessionStorage.setItem("query", query);
    getAllMedia(query)
      .then((response: any) => {
        setResources(response.data.results);
        setLoaded(true);
        setQuery(query);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleSearchInput();

    return () => {
      setResources([]);
      sessionStorage.removeItem("query");
    };
  }, []);

  return (
    <Container>
      {resources.length ? (
        <Fade in={!!resources.length}>
          <ul className="search-results__list">
            {window.location.search &&
              loaded &&
              resources.map((item: any, i: number) => {
                const imageSrc = item["poster_path"] || item["profile_path"];
                return (
                  <li
                    className="search-results__list-item"
                    key={i}
                    onClick={() => (window.location.href = `/details/${item["media_type"]}/${item.id}`)}
                  >
                    <div className="search-results__list-item-image-wrapper">
                      <img
                        src={imageSrc ? `https://image.tmdb.org/t/p/original/${imageSrc}` : defaultPlaceholder}
                        alt={item.title || item.name}
                      />
                    </div>
                    <div className="search-results__list-item-content">
                      <Typography
                        variant="h3"
                        sx={{ fontSize: 24, fontWeight: "200" }}
                      >
                        {item.title || item["original_name"]}
                      </Typography>
                      <p>{item.overview?.length > 300 ? `${item.overview.substring(0, 300)}. . .` : item.overview}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </Fade>
      ) : (
        <h3>Maks a search</h3>
      )}
    </Container>
  );
};

export default SearchResults;
