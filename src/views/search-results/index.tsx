import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// MUI
import { Container, Fade } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [resources, setResources] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(sessionStorage.getItem("query"));
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  sessionStorage.setItem("urlParams", window.location.search);

  const location = useLocation();

  const handleSearchInput = () => {
    if (window.location.search) {
      setLoaded(false);
      getAllMedia(window.location.search)
        .then((response: any) => {
          setResources(response.data.results);
          setLoaded(true);
          setQuery(query);
          setCount(response.data["total_pages"]);
          setTotalResults(response.data["total_results"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [searchParams, setSearchParams] = useSearchParams(); // Sets URL params
  const params = new URLSearchParams(searchParams); // Creates params

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  useEffect(() => {
    console.log("query change", location.search);
    if (!location.search) {
      setResources([]);
    } else {
      handleSearchInput();
    }
  }, [location.search]);

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
          <div className="search-results">
            <div className="search-results__count">
              <h3>Total results - {totalResults}</h3>
            </div>
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
                      {/* <div className="search-results__list-item-content">
                <Typography
                  variant="h3"
                  sx={{ fontSize: 24, fontWeight: "200" }}
                >
                  {item.title || item["original_name"]}
                </Typography>
                <p>{item.overview?.length > 300 ? `${item.overview.substring(0, 300)}. . .` : item.overview}</p>
              </div> */}
                    </li>
                  );
                })}
            </ul>
            <div className="search-results__pagination">
              <Pagination
                count={count}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        </Fade>
      ) : (
        !window.location.search && <h3>No results</h3>
      )}
    </Container>
  );
};

export default SearchResults;
