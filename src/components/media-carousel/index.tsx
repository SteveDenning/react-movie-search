import React, { useEffect, useState } from "react";

// Services
import { updateFavorite } from "../../services/favorites";
import { getFavorites } from "../../services/favorites";
import { getMedia } from "../../services/media";

// Components
import Carousel from "../../components/carousel";
import SectionHeading from "../../components/section-heading";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";

// Styles
import "./media-carousel.scss";

interface Props {
  label?: string;
  pathName: string;
  responsiveOptions?: object;
  buttonText?: string;
  buttonLink?: string;
  dataResource?: "cast" | "results";
  media?: "tv" | "movies" | "person" | "movie";
  onClick?: () => void;
}

const MediaCarousel: React.FC<Props> = ({ label, responsiveOptions, pathName, buttonText, buttonLink, dataResource = "results", media, onClick }) => {
  const [resources, setResources] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>([]);

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
      favorite: !resource?.favorite,
    };

    updateFavorite(user.account_id, body)
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  const getFavoritesList = () => {
    getFavorites(user.account_id, media)
      .then((response) => {
        setFavorites(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    updateResources();
  }, [resources]);

  const handleAddFavorite = () => {
    const updatedArray = resources.map((resource) => {
      const isFavorite = favorites.find((favorite) => favorite.id === resource.id);
      return isFavorite ? { ...resource, favorite: true } : resource;
    });
    setItems(updatedArray);
  };

  const updateResources = () => {
    if (user && media !== "person") {
      getFavoritesList();
    } else {
      setItems(resources);
    }
  };

  useEffect(() => {
    handleAddFavorite();
  }, [favorites]);

  useEffect(() => {
    fetchMediaForCarousel();
  }, []);

  return (
    <>
      {items?.length && (
        <Fade in={!!items.length}>
          <div
            data-testid="media-carousel"
            className="media-carousel"
          >
            <SectionHeading
              text={label}
              buttonText={buttonText}
              buttonLink={buttonLink}
              onClick={onClick}
            />
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
