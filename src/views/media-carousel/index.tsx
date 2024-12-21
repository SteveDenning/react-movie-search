import React, { useEffect, useState } from "react";

// Services
import { getFavourites } from "../../services/getFavourites";
import { getMedia } from "../../services/getMedia";
import { addFavourite } from "../../services/addFavourite";

// Components
import Button from "../../components/button";
import Carousel from "../../components/carousel";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./media-carousel.scss";

interface Props {
  label?: string;
  pathName: string;
  responsiveOptions?: object;
  buttonText?: string;
  dataResource?: "cast" | "results";
  media?: "tv" | "movies" | "person" | "movie";
}

const MediaCarousel: React.FC<Props> = ({ label, responsiveOptions, pathName, buttonText, dataResource = "results", media }) => {
  const [resources, setResources] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<any>([]);

  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const fetchMediaForCarousel = () => {
    setLoading(true);
    getMedia(pathName)
      .then((response: any) => {
        setResources(response.data[dataResource]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleFavorite = (resource: any) => {
    let type;
    if (Object.prototype.hasOwnProperty.call(resource, "media_type")) {
      type = resource.media_type;
    } else if (Object.prototype.hasOwnProperty.call(resource, "name")) {
      type = "tv";
    } else {
      type = "movie";
    }

    const body = {
      media_type: type,
      media_id: resource.id,
      favorite: !resource?.favourite,
    };

    addFavourite(user.id, body)
      .then(() => {
        getFavouritesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavouritesList = () => {
    getFavourites(user.id, media)
      .then((response) => {
        setFavourites(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateResources();
  }, [resources]);

  const handleAddFavourite = () => {
    const updatedArray = resources.map((resource) => {
      const isFavourite = favourites.find((favourite) => favourite.id === resource.id);
      return isFavourite ? { ...resource, favourite: true } : resource;
    });
    setItems(updatedArray);
  };

  const updateResources = () => {
    if (user && media !== "person") {
      getFavouritesList();
    } else {
      setItems(resources);
    }
  };

  useEffect(() => {
    handleAddFavourite();
  }, [favourites]);

  useEffect(() => {
    fetchMediaForCarousel();
  }, []);

  return (
    <>
      {items.length && (
        <Fade in={!!items.length}>
          <div
            data-testid="media-carousel"
            className="media-carousel"
          >
            <div
              className="media-carousel__header"
              data-testid="media-carousel-header"
            >
              <h2
                className="text-glow"
                data-testid="media-carousel-label"
              >
                {label}
              </h2>
              {buttonText && (
                <Button
                  onClick={() => (window.location.href = `/media-listing/${pathName}?page=1`)}
                  variant="heading"
                >
                  <span className="media-carousel__link-text text-glow">{buttonText}</span>
                  <ArrowForwardIosIcon />
                </Button>
              )}
            </div>
            <Carousel
              media={media}
              resources={items}
              responsiveOptions={responsiveOptions}
              handleFavorite={handleFavorite}
            />
          </div>
        </Fade>
      )}
      {error && (
        <p
          className="error"
          data-testid="banner-carousel-error"
        >
          {`There was a problem getting the ${media} - please try again later`}
        </p>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default MediaCarousel;
