import React from "react";
import ReactCarousel from "react-multi-carousel";

// Components
import Card from "../card";
import Image from "../image";

// Styles
import "./carousel.scss";

interface Props {
  autoPlaySpeed?: number;
  autoPlay?: boolean;
  banner?: boolean;
  infinite?: boolean;
  media?: string;
  resources: any[];
  responsiveOptions?: object;
  handleFavorite?: (isFavorite: boolean) => void;
  user?: any;
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
  user,
}) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 2,
      slidesToSlide: 2,
    },
  };

  const options = {
    renderDotsOutside: true,
    responsive: { ...responsive, ...responsiveOptions },
    pauseOnHover: true,
    slidesToSlide: 5,
    infinite: true,
    additionalTransfrom: 0,
    arrows: true,
    className: "",
    containerClass: "container",
    dotListClass: "",
    draggable: true,
    itemClass: "",
    keyBoardControl: true,
    minimumTouchDrag: 80,
    partialVisible: true,
    shouldResetAutoplay: true,
    sliderClass: "",
    showDots: false,
    swipeable: true,
  };

  return (
    <div
      className="carousel"
      data-testid="carousel"
    >
      {resources.length && (
        <ReactCarousel
          {...options}
          autoPlay={autoPlay}
          autoPlaySpeed={autoPlaySpeed}
          infinite={infinite}
        >
          {resources.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="carousel__item"
                data-testid="carousel-item"
              >
                {banner ? (
                  <>
                    <button
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
                    </button>
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
        </ReactCarousel>
      )}
    </div>
  );
};

export default Carousel;
