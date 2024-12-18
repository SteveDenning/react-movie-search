import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Services
import { getMedia } from "../../services/getMedia";

// Components
import Resources from "../../components/resources";

// MUI
import { Container } from "@mui/material";

// Styles
import "./media-listing.scss";

const MediaListing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resources, setResources] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const request = `${window.location.pathname.split("/")[2]}/${window.location.pathname.split("/")[3]}${location.search}`;

  const handlePageChange = (event, value) => {
    setPage(value);
    updateQuery("page", value);
  };

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  const fetchLatestRelease = () => {
    if (location.search) {
      setLoading(true);
      getMedia(request)
        .then((response: any) => {
          setResources(response.data.results);
          setCount(Math.ceil(response.data["total_pages"]));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  useEffect(() => {
    fetchLatestRelease();
    setPage(Number(params.get("page")));
  }, [page]);

  return (
    <div
      className="media-listing"
      data-testid="media-listing"
    >
      <Container>
        <h2 className="media-listing__header">{window.location.pathname.split("/")[2]}</h2>
        <Resources
          resources={resources}
          page={page}
          handlePageChange={handlePageChange}
          count={count}
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default MediaListing;
