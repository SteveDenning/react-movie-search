import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// Utils
import { getAllMediaFromSearch } from "../../utils/get-resources";

// MUI
import { Container } from "@mui/material";

// Views
import Resources from "../../views/resources";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const type = window.location.pathname.split("/")[2];
  const params = new URLSearchParams(searchParams);
  const location = useLocation();

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  const handleSearchInput = () => {
    if (window.location.search) {
      setLoading(true);
      getAllMediaFromSearch(`${type}${window.location.search}`)
        .then((response: any) => {
          setResources(response.data.results);
          setCount(response.data["total_pages"]);
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
      {resources.length && (
        <Resources
          resources={resources}
          page={page}
          handlePageChange={handlePageChange}
          count={count}
          loading={loading}
        />
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
  );
};

export default SearchResults;
