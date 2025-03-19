import React from "react";
import Slider from "react-slick";

// Assets
import bannerPlaceholder from "../../assets/images/banner-placeholder.png";

// Config
import { config } from "../../config/routes";

// Components
import Button from "../button";
import Card from "../card";
import Image from "../image";

// MUI Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Styles
import "./carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Types
import { ResponsiveOptionsType } from "../../models/types";

interface Props {
  autoPlaySpeed?: number;
  autoPlay?: boolean;
  banner?: boolean;
  infinite?: boolean;
  media?: string;
  resources: any[];
  responsiveOptions?: ResponsiveOptionsType[];
  handleFavorite?: (isFavorite: boolean) => void;
  user?: any;
  fade?: boolean;
  options?: any;
}

const Carousel: React.FC<Props> = ({
  autoPlay = false,
  autoPlaySpeed,
  banner,
  infinite,
  media = "movie",
  resources,
  responsiveOptions,
  handleFavorite,
  fade = false,
  user,
}) => {
  const defaultOptions: ResponsiveOptionsType[] = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ];

  const settings = {
    fade: fade,
    dots: false,
    infinite: infinite,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoplay: autoPlay,
    autoPlaySpeed: autoPlaySpeed,
    responsive: responsiveOptions || defaultOptions,
    nextArrow: (
      <Button variant="icon">
        <ChevronRightIcon />
      </Button>
    ),
    prevArrow: (
      <Button variant="icon">
        <ChevronLeftIcon />
      </Button>
    ),
  };

  return (
    <div
      className="carousel"
      data-testid="carousel"
    >
      {!!resources.length && (
        <Slider {...settings}>
          {resources.map((item: any, index: number) => {
            const mediaType = item.media_type;

            return (
              <div
                key={index}
                className="carousel__item"
                data-testid="carousel-item"
              >
                {banner ? (
                  <>
                    <Button
                      className="carousel__overlay"
                      onClick={() => (window.location.href = `${config.details.path}/${mediaType}/${item.id}`)}
                      testId="carousel-overlay"
                      variant="plain"
                    >
                      <span
                        className="sr-only"
                        aria-hidden={true}
                      >
                        Click to open
                      </span>
                    </Button>
                    <Image
                      src={item["backdrop_path"] ? `${process.env.REACT_APP_TMDB_IMAGE_PATH}${item["backdrop_path"]}` : bannerPlaceholder}
                      resource={item}
                    />
                    <div className="carousel__banner-content">
                      <div className="carousel__banner-poster">
                        <Image
                          resource={item}
                          alt={`Poster Image for ${item.title || item.name}`}
                        />
                      </div>
                      <div className="carousel__banner-details">
                        <h2>{item.title || item.name}</h2>
                      </div>
                    </div>
                  </>
                ) : (
                  <Card
                    resource={item}
                    handleFavorite={handleFavorite}
                    onClick={() => (window.location.href = `${config.details.path}/${item.media_type || media}/${item.id}`)}
                    user={user}
                  />
                )}
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
