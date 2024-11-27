import React, { useEffect, useState } from "react";

// Utils
import { getMedia } from "../../utils/get-resources";

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
  const [open, setOpen] = useState(false);

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
    setOpen(true);
    getMedia(path)
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
      <div
        data-testid="banner-carousel"
        className="banner-carousel"
      >
        <Fade in={!!resources.length}>
          <div className="banner-carousel__inner">
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
      </div>
      <Backdrop open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default BannerCarousel;
