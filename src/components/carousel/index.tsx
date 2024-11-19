import React from "react";
import ReactCarousel from "react-multi-carousel";

// Components
import Card from "../../components/card";
import Image from "../../components/image";

// Styles
import "./carousel.scss";

interface Props {
  autoPlaySpeed?: number;
  autoPlay?: boolean;
  banner?: boolean;
  imagePath?: string;
  infinite?: boolean;
  media?: string;
  resources: any;
  responsiveOptions?: any;
  variant?: string;
}

const Carousel: React.FC<Props> = ({
  autoPlay = false,
  autoPlaySpeed,
  banner,
  imagePath,
  infinite,
  media,
  resources,
  responsiveOptions,
  variant,
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

  const baseClass = "carousel";
  const variantClass = variant ? `carousel--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="carousel"
    >
      <ReactCarousel
        {...options}
        autoPlay={autoPlay}
        autoPlaySpeed={autoPlaySpeed}
        infinite={infinite}
      >
        {resources.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className="carousel__item"
              onClick={() => (window.location.href = `/details/${media}/${item.id}`)}
            >
              {banner ? (
                <>
                  <Image
                    resource={item}
                    content
                    imagePath={imagePath}
                  />
                  <div className="carousel__banner-content">
                    <div className="carousel__banner-poster">
                      <Image
                        id={item.id}
                        resource={item}
                        content
                        imagePath="poster_path"
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
                  imagePath={imagePath}
                />
              )}
            </div>
          );
        })}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
