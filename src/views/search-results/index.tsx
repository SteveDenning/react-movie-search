import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Utils
import { getAllMediaFromSearch } from "../../utils/get-resources";

// MUI
import { Container, Backdrop, CircularProgress } from "@mui/material";

// Components
import Resources from "../../components/resources";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const type = params.get("type") || "multi";
  const query = params.get("query") || null;

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  const handleGetResults = () => {
    if (query) {
      setLoading(true);
      setResources([]);
      getAllMediaFromSearch(`${type}${window.location.search}`)
        .then((response: any) => {
          setResources(response.data.results);
          setCount(response.data["total_pages"]);
          setTotalResults(response.data["total_results"]);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    }
  };

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  useEffect(() => {
    handleGetResults();
    if (!query) {
      setResources([]);
    }
  }, [type, query, page]);

  useEffect(() => {
    updateQuery("page", 1);
  }, [type]);

  useEffect(() => {
    handleGetResults();
    return () => {
      setResources([]);
      sessionStorage.removeItem("query");
    };
  }, []);

  return (
    <div className="search-results">
      <Container>
        {query && (
          <h2 className="search-results__header">
            Displaying <span>{totalResults} </span> results for: <span>{query} </span>
          </h2>
        )}
        {resources.length ? (
          <Resources
            resources={resources}
            page={page}
            handlePageChange={handlePageChange}
            count={count}
            loading={loading}
          />
        ) : (
          !loading && (
            <div className="search-results__no-results">
              <h2 className="search-results__no-results-title">Let&#39;s try another search</h2>
            </div>
          )
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
