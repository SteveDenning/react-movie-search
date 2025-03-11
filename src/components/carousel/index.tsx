import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components

import Card from "../card";
import Image from "../image";

// MUI Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Styles
import "./carousel.scss";
import Button from "../../components/button";

interface Props {
  autoPlaySpeed?: number;
  autoPlay?: boolean;
  banner?: boolean;
  infinite?: boolean;
  media?: string;
  resources: any[];
  responsiveOptions?: any;
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
  const responsive = [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 5,
        desktopSlides: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ];

  const settings = {
    fade: fade,
    dots: false,
    infinite: infinite,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoPlaySpeed: autoPlaySpeed,
    responsive: responsiveOptions?.length ? responsiveOptions : responsive,
    initialSlide: 0,
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
      {resources.length && (
        <Slider {...settings}>
          {resources.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="carousel__item"
                data-testid="carousel-item"
              >
                {banner ? (
                  <>
                    <a
                      tabIndex={0}
                      className="carousel__overlay"
                      onClick={() => (window.location.href = `/details/${media}/${item.id}`)}
                    >
                      <span
                        className="sr-only"
                        aria-hidden={true}
                      >
                        Click to open
                      </span>
                    </a>
                    <Image
                      id={item.id}
                      resource={item}
                      variant="banner"
                    />
                    <div className="carousel__banner-content">
                      <div className="carousel__banner-poster">
                        <Image
                          id={`${item.id}-${item.title || item.name}`}
                          resource={item}
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
                    onClick={() => (window.location.href = `/details/${media}/${item.id}`)}
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
