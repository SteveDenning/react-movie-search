import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

// Utils
import { getLatestReleases } from "../../utils/services";

// Components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Fade } from "@mui/material";
import Image from "../../components/image";

// Styles
import "react-multi-carousel/lib/styles.css";
import "./latest-releases.scss";

const LatestReleases = () => {
  const [results, setResults] = useState<any>([]);
  const [open, setOpen] = useState(false);

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
    showDots: true,
    swipeable: true,
  };

  const fetLatestRelease = () => {
    setOpen(true);
    getLatestReleases()
      .then((response: any) => {
        setResults(response.data.results);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetLatestRelease();
  }, []);

  return (
    <>
      <Fade in={!!results.length}>
        <div
          data-testid="latest-releases"
          className="latest-releases"
        >
          <Container>
            <h2>Latest Releases</h2>

            <Carousel {...options}>
              {results.map((item: any, i: number) => {
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
            </Carousel>
          </Container>
        </div>
      </Fade>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LatestReleases;
