import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Services
import { getMedia } from "../../services/media";

// Components
import Resources from "../../components/resources";
import SectionHeading from "../../components/section-heading";

// MUI
import { Container } from "@mui/material";

// Styles
import "./media-listing.scss";

const MediaListing = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const mediaType = window.location.pathname.split("/")[2];
  const request = `${mediaType}/${window.location.pathname.split("/")[3]}/${window.location.pathname.split("/")[4]}${location.search}`;
  const title = decodeURI(window.location.pathname.split("/")[5] as string);

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
          console.error(error);
          setError(error);
          setLoading(false);
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
        <SectionHeading
          heading={title}
          backButton
        />
        <Resources
          resources={resources}
          page={page}
          handlePageChange={handlePageChange}
          count={count}
          loading={loading}
        />
      </Container>
      {error && (
        <p
          className="error"
          data-testid="media-listing-error"
        >
          There was a problem with the banner - please try again later
        </p>
      )}
    </div>
  );
};

export default MediaListing;
