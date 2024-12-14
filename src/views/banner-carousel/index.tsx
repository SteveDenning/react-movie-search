import React, { useEffect, useState } from "react";

// Utils
import { getMedia } from "../../services/getMedia";

// Components
import Carousel from "../../components/carousel";

// MUI
import Backdrop from "@mui/material/Backdrop";
import { Fade } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// Styles
import "./banner-carousel.scss";

interface Props {
  media: string;
  path: string;
}

const BannerCarousel: React.FC<Props> = ({ media, path }) => {
  const [resources, setResources] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const responsiveOptions = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const fetchLatestRelease = () => {
    setLoading(true);
    getMedia()
      .then((response: any) => {
        setResources(response.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  return (
    <>
      <div className="banner-carousel">
        {resources.length && (
          <Fade in={!loading}>
            <div
              className="banner-carousel__inner "
              data-testid="banner-carousel"
            >
              <Carousel
                resources={resources}
                media={media}
                responsiveOptions={responsiveOptions}
                autoPlay={true}
                autoPlaySpeed={5000}
                infinite
                banner
              />
            </div>
          </Fade>
        )}
      </div>
      {error && (
        <p
          className="error"
          data-testid="banner-carousel-error"
        >
          There was a problem the banner - please try again later
        </p>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default BannerCarousel;
