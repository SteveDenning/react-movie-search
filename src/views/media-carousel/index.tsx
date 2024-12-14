import React, { useEffect, useState } from "react";

// Services
import { getMedia } from "../../services/getMedia";

// Components
import Button from "../../components/button";
import Carousel from "../../components/carousel";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./media-carousel.scss";

interface Props {
  label?: string;
  pathName: string;
  responsiveOptions?: object;
  buttonText?: string;
  dataResource?: "cast" | "results";
  media?: string;
}

const MediaCarousel: React.FC<Props> = ({ label, responsiveOptions, pathName, buttonText, dataResource = "results", media }) => {
  const [resources, setResources] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMediaForCarousel = () => {
    setLoading(true);
    getMedia(pathName)
      .then((response: any) => {
        setResources(response.data[dataResource]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMediaForCarousel();
  }, []);

  return (
    <>
      {resources.length && (
        <Fade in={!!resources.length}>
          <div
            data-testid="media-carousel"
            className="media-carousel"
          >
            <div
              className="media-carousel__header"
              data-testid="media-carousel-header"
            >
              <h2
                className="text-glow"
                data-testid="media-carousel-label"
              >
                {label}
              </h2>
              {buttonText && (
                <Button
                  onClick={() => (window.location.href = `/media-listing/${pathName}?page=1`)}
                  variant="heading"
                >
                  <span className="media-carousel__link-text text-glow">{buttonText}</span>
                  <ArrowForwardIosIcon />
                </Button>
              )}
            </div>
            <Carousel
              media={media}
              resources={resources}
              responsiveOptions={responsiveOptions}
            />
          </div>
        </Fade>
      )}
      {error && (
        <p
          className="error"
          data-testid="banner-carousel-error"
        >
          {`There was a problem getting the ${media} - please try again later`}
        </p>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default MediaCarousel;
