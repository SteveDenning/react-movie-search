import React from "react";

import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "../../components/image";

// Styles
import "./carousel.scss";

interface Props {
  resources: any;
}

const Carousel: React.FC<Props> = ({ resources }) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 5,
      partialVisibilityGutter: -1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
  };

  const options = {
    renderDotsOutside: true,
    responsive: responsive,
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
      <ReactCarousel {...options}>
        {resources.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className="latest-releases__list-item"
              onClick={() => (window.location.href = `/details/${item.id}`)}
            >
              <Image resource={item} />
            </div>
          );
        })}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
