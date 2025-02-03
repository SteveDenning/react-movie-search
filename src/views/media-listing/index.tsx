import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Services
import { getMedia } from "../../services/media";

// Utils
import { MOVIES_TITLE, TV_SHOWS_TITLE, ACTORS_TITLE, MEDIA_TITLE } from "../../utils/constants";

// Components
import Resources from "../../components/resources";
import SectionHeading from "../../components/section-heading";

// MUI
import { Container } from "@mui/material";

// Styles
import "./media-listing.scss";

const MediaListing = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [heading, setHeading] = useState<string>("");
  const [resources, setResources] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const mediaType = window.location.pathname.split("/")[2];
  const request = `${mediaType}/${window.location.pathname.split("/")[3]}${location.search}`;

  const handlePageTitle = () => {
    let title = null;
    switch (mediaType) {
      case "movie":
        title = setHeading(MOVIES_TITLE);
        break;
      case "tv":
        title = setHeading(TV_SHOWS_TITLE);
        break;
      case "people":
        title = setHeading(ACTORS_TITLE);
        break;
      default:
        title = setHeading(MEDIA_TITLE);
    }
    return title;
  };

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
          handlePageTitle();
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
        <SectionHeading text={heading} />
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
