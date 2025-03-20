import React, { useEffect, useState } from "react";

// Components
import Card from "../card";
import Pagination from "../pagination";

// MUI
import { Fade, Grid, Backdrop, CircularProgress } from "@mui/material";

// Services
import { updateFavorite } from "../../services/favorites";
import { getFavorites } from "../../services/favorites";

// Styles
import "./resources.scss";

interface Props {
  resources: any[];
  handlePageChange?: (event: React.ChangeEvent<any>, value: number) => void;
  count: number;
  page: number;
  loading: boolean;
}

const Resources: React.FC<Props> = ({ resources, handlePageChange, count, page }) => {
  const [favorites, setFavorites] = useState([]);
  const [tVFavorites, setTvFavorites] = useState([]);
  const [movieFavorites, setMovieFavorites] = useState([]);
  const [items, setItems] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const params = new URLSearchParams(window.location.search);
  const mediaType = params.get("filterByType") || window.location.pathname.split("/")[2];

  const handleFavorite = (resource: any) => {
    let mediaType;
    if (Object.prototype.hasOwnProperty.call(resource, "media_type")) {
      mediaType = resource.media_type;
    } else if (Object.prototype.hasOwnProperty.call(resource, "name")) {
      mediaType = "tv";
    } else {
      mediaType = "movie";
    }

    const body = {
      media_type: mediaType,
      media_id: resource.id,
      favorite: !resource?.favorite,
    };

    updateFavorite(user, body)
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  const getFavoritesList = (type?) => {
    if (user) {
      setItems([]);
      getFavorites(user, type)
        .then((response) => {
          if (type === "tv") {
            setTvFavorites(response.data.results);
          } else {
            setMovieFavorites(response.data.results);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleAddFavorite = () => {
    if (items?.length) {
      const updatedArray = items.map((item) => {
        const isFavorite = favorites.find((favorite) => favorite.id === item.id);
        return isFavorite ? { ...item, favorite: true } : item;
      });
      setItems(updatedArray);
    }
  };

  const handleOnClick = (item: any, path: string) => {
    window.location.href = `/details/${path}/${item.id}`;
  };

  useEffect(() => {
    handleAddFavorite();
  }, [favorites]);

  useEffect(() => {
    getFavoritesList("movie");
    getFavoritesList("tv");
    setItems(resources);
  }, [resources]);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    setFavorites([tVFavorites, movieFavorites].flat());
  }, [tVFavorites, movieFavorites]);

  return (
    <div
      className="resources"
      data-testid="resources"
    >
      <Fade in={!!items?.length}>
        <div className="resources__inner">
          <Grid
            aria-label="Results"
            container
            spacing={2}
            rowGap={0}
            component="ul"
            columns={20}
          >
            {items?.map((item: any, index: number) => {
              const path = item?.media_type ? item?.media_type : mediaType;

              return (
                <Grid
                  component="li"
                  item
                  xs={10}
                  md={5}
                  lg={4}
                  key={index}
                >
                  <Card
                    resource={item}
                    onClick={() => handleOnClick(item, path)}
                    variant="resource"
                    handleFavorite={(event) => handleFavorite(event)}
                    favorite
                    user={user}
                  />
                </Grid>
              );
            })}
          </Grid>
          {count > 1 && (
            <Pagination
              count={count}
              page={page}
              onChangePage={handlePageChange}
            />
          )}
        </div>
      </Fade>
      <Backdrop open={!items?.length}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Resources;
