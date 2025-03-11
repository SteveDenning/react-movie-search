import React, { useEffect, useState } from "react";

// Services
import { getMedia } from "../../services/media";

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
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLatestRelease = () => {
    setLoading(true);
    getMedia(path)
      .then((response: any) => {
        setResources(response.data.results);
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
      {resources?.length && (
        <div className="banner-carousel">
          <Fade in={!loading}>
            <div
              className="banner-carousel__inner "
              data-testid="banner-carousel"
            >
              <Carousel
                resources={resources}
                media={media}
                autoPlay={true}
                autoPlaySpeed={5000}
                infinite
                banner
                fade
              />
            </div>
          </Fade>
        </div>
      )}
      {error && (
        <p
          className="error"
          data-testid="banner-carousel-error"
        >
          There was a problem with the banner - please try again later
        </p>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default BannerCarousel;
