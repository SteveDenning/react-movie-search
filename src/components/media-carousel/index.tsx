import React, { useEffect, useState } from "react";

// Services
import { updateFavorite } from "../../services/favorites";
import { getFavorites } from "../../services/favorites";
import { getMedia } from "../../services/media";

// Components
import Carousel from "../../components/carousel";
import SectionHeading from "../../components/section-heading";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";

// Types
import { ResponsiveOptionsType } from "../../models/types";

// Styles
import "./media-carousel.scss";

interface Props {
  label?: string;
  pathName?: string;
  responsiveOptions?: ResponsiveOptionsType[];
  buttonText?: string;
  buttonLink?: string;
  dataResource?: "cast" | "results";
  media?: "tv" | "movies" | "person" | "movie" | string;
  resourceItems?: any[];
}

const MediaCarousel: React.FC<Props> = ({
  label,
  responsiveOptions,
  pathName,
  buttonText,
  buttonLink,
  dataResource = "results",
  media,
  resourceItems,
}) => {
  const [resources, setResources] = useState<any>(resourceItems || []);
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>([]);

  const user = useUser();

  const fetchMediaForCarousel = () => {
    if (!resourceItems?.length) {
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
    }
  };

  const handleFavorite = (resource: any) => {
    if (user) {
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

      updateFavorite(user, body)
        .then()
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getFavoritesList = () => {
    getFavorites(user, media)
      .then((response) => {
        setFavorites(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    updateResources();
  }, [resourceItems, resources, user]);

  const handleAddFavorite = () => {
    const updatedArray = resources.map((resource) => {
      const isFavorite = favorites.find((favorite) => favorite.id === resource.id);
      return isFavorite ? { ...resource, favorite: true } : resource;
    });
    setItems(updatedArray);
  };

  const updateResources = () => {
    if (user && media !== "person") {
      console.log("getFavoritesList");
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
              heading={label}
              buttonText={buttonText}
              buttonLink={buttonLink}
            />
            <Carousel
              media={media}
              resources={items}
              responsiveOptions={responsiveOptions}
              handleFavorite={handleFavorite}
              user={user}
            />
          </div>
        </Fade>
      )}
      {error && (
        <p
          className="error"
          data-testid="media-carousel-error"
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
