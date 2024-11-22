import React, { useEffect, useState } from "react";

// Utils
import { getMedia } from "../../utils/get-resources";

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
  responsiveOptions?: any;
  buttonText?: string;
  dataResource?: "cast" | "results";
  media?: "tv" | "movie" | "person";
}

const MediaCarousel: React.FC<Props> = ({ label, responsiveOptions, pathName, buttonText, dataResource = "results", media }) => {
  const [resources, setResources] = useState<any>([]);
  const [loading, seLoading] = useState(false);

  const fetchMediaForCarousel = () => {
    seLoading(true);
    getMedia(pathName)
      .then((response: any) => {
        setResources(response.data[dataResource]);
        seLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMediaForCarousel();
  }, []);

  return (
    <>
      <Fade in={!!resources.length}>
        <div
          data-testid="media-carousel"
          className="media-carousel"
        >
          {resources.length && (
            <>
              <div className="media-carousel__header">
                <h2 className="text-glow">{label}</h2>
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
            </>
          )}
        </div>
      </Fade>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default MediaCarousel;
