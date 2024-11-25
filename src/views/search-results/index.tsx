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
  const [resources, setResources] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(sessionStorage.getItem("query"));
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = window.location.pathname.split("/")[2];

  sessionStorage.setItem("urlParams", window.location.search);

  const params = new URLSearchParams(searchParams);

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  const location = useLocation();

  const handleSearchInput = () => {
    if (window.location.search) {
      setLoading(true);
      getAllMediaFromSearch(`${type}${window.location.search}`)
        .then((response: any) => {
          setResources(response.data.results);
          setQuery(query);
          setCount(response.data["total_pages"]);
          setTotalResults(response.data["total_results"]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
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
          totalResults={totalResults}
          page={page}
          handlePageChange={handlePageChange}
          count={count}
          loading={loading}
        />
      )}
    </Container>
  );
};

export default SearchResults;
