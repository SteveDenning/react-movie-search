import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Services
import { getAllMediaFromSearch } from "../../services/search";

// MUI
import { Container, Backdrop, CircularProgress } from "@mui/material";

// Components
import Resources from "../../components/resources";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const type = params.get("filterByType") || "multi";
  const query = params.get("query") || null;
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const resultsType = type === "multi" ? "results" : type === "movie" ? "Films" : type === "tv" ? "TV Shows" : "People";

  const handleGetResults = () => {
    if (window.location.search) {
      setLoading(true);
      getAllMediaFromSearch(`${type}${window.location.search}`)
        .then((response: any) => {
          if (response.data) {
            setResources(response.data?.results);
            setCount(response.data?.total_pages);
            setTotalResults(response.data?.total_results);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
          setResources([]);
        });
    } else {
      setLoading(false);
      setResources([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  useEffect(() => {
    handleGetResults();
  }, [type, query, page]);

  return (
    <div
      className="search-results"
      data-testid="search-results"
    >
      <Container>
        {query && !!resources?.length && (
          <h2 className="search-results__header">
            Displaying <span>{totalResults} </span> {resultsType} for: <span>{query} </span>
          </h2>
        )}
        {resources?.length ? (
          <Resources
            resources={resources}
            page={Number(params.get("page")) || page}
            handlePageChange={handlePageChange}
            count={count}
            loading={loading}
          />
        ) : (
          <div className="search-results__no-results">
            <h2 className="search-results__no-results-title">Let&#39;s try another search</h2>
          </div>
        )}
        {error && (
          <p
            className="error"
            data-testid="search-results-error"
          >
            There was a problem getting the results - please try again later
          </p>
        )}
      </Container>

      <Backdrop open={loading}>
        <CircularProgress variant="indeterminate" />
      </Backdrop>
    </div>
  );
};

export default SearchResults;
