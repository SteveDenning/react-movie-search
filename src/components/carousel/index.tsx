import React from "react";

// Components
import Image from "../../components/image";
import ReactCarousel from "react-multi-carousel";

// Styles
import "./carousel.scss";

interface Props {
  resources: any;
  label: string;
  type: string;
}

const Carousel: React.FC<Props> = ({ resources, label, type }) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 5,
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
      <h2>Latest {label} Releases</h2>

      <ReactCarousel {...options}>
        {resources.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className="latest-releases__list-item"
              onClick={() => (window.location.href = `/details/${type}/${item.id}`)}
            >
              <Image
                resource={item}
                type="poster"
              />
            </div>
          );
        })}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
