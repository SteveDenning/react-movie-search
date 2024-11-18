import React, { useEffect, useState } from "react";

// Utils
import { getLatestReleases } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import Carousel from "../../components/carousel";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Fade } from "@mui/material";
import { Typography } from "@mui/material";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./latest-releases.scss";

interface Props {
  label: string;
  media: string;
  path: string;
  imagePath: string;
}

const LatestReleases: React.FC<Props> = ({ label, media, path, imagePath }) => {
  const [resources, setResources] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetchLatestRelease = () => {
    setOpen(true);
    getLatestReleases(path)
      .then((response: any) => {
        setResources(response.data.results);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  return (
    <>
      <Fade in={!!resources.length}>
        <div
          data-testid="latest-releases"
          className="latest-releases"
        >
          <Container>
            {resources.length && (
              <>
                <div className="latest-releases__header">
                  <Typography
                    className="latest-releases__header-title"
                    variant="h2"
                    sx={{ fontSize: 24, fontWeight: "200" }}
                  >
                    <Button
                      onClick={() => (window.location.href = `/media-listing/${path}?page=1`)}
                      variant="heading"
                    >
                      {label}
                      <ArrowForwardIosIcon />
                    </Button>
                  </Typography>
                </div>
                <Carousel
                  imagePath={imagePath}
                  media={media}
                  resources={resources}
                />
              </>
            )}
          </Container>
        </div>
      </Fade>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LatestReleases;
