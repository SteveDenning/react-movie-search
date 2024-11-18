import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// MUI
import { Container } from "@mui/material";

// Views
import Resources from "../../views/resources";

// Styles
import "./search-results.scss";

const SearchResults = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(sessionStorage.getItem("query"));
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  sessionStorage.setItem("urlParams", window.location.search);

  const location = useLocation();

  const handleSearchInput = () => {
    if (window.location.search) {
      getAllMedia(window.location.search)
        .then((response: any) => {
          setResources(response.data.results);
          setQuery(query);
          setCount(response.data["total_pages"]);
          setTotalResults(response.data["total_results"]);
        })
        .catch((error) => {
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
        />
      )}
    </Container>
  );
};

export default SearchResults;
