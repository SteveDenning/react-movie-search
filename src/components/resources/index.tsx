import React, { useEffect, useState } from "react";

// Services
import { addFavourite } from "../../services/addFavourite";
import { getFavourites } from "../../services/getFavourites";

// Components
import Card from "../../components/card";
import Pagination from "../../components/pagination";

// MUI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade, Grid } from "@mui/material";

// Styles
import "./resources.scss";

interface Props {
  resources: any[];
  handlePageChange?: (event: React.ChangeEvent<any>, value: number) => void;
  count: number;
  page: number;
  loading: boolean;
}

const Resources: React.FC<Props> = ({ resources, handlePageChange, count, page, loading }) => {
  const [favourites, setFavourites] = useState([]);
  const [items, setItems] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || window.location.pathname.split("/")[2];
  const user = JSON.parse(sessionStorage.getItem("user") || null);
  const isMulti = type === "multi";
  const isPerson = type === "person";

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
        getFavouritesList(type);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavouritesList = (type?) => {
    getFavourites(user.id, type)
      .then((response) => {
        setFavourites(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFavourite = () => {
    const updatedArray = resources.map((resource) => {
      const isFavourite = favourites.find((favourite) => favourite.id === resource.id);
      return isFavourite ? { ...resource, favourite: true } : resource;
    });
    setItems(updatedArray);
  };

  // Need to simplify this
  const updateResources = () => {
    if (user) {
      if (!isPerson && !isMulti) {
        getFavouritesList(type);
      } else {
        setItems(resources);
      }
    } else {
      setItems(resources);
    }
  };

  const handleOnClick = (item: any, path: string) => {
    window.location.href = `/details/${path}/${item.id}`;
  };

  useEffect(() => {
    handleAddFavourite();
  }, [favourites]);

  useEffect(() => {
    updateResources();
  }, [resources]);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

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
            {items.map((item: any, i: number) => {
              const path = item["media_type"] ? item["media_type"] : type;

              return (
                <Grid
                  component="li"
                  item
                  xs={10}
                  sm={5}
                  lg={4}
                  key={i}
                >
                  <Card
                    resource={item}
                    onClick={() => handleOnClick(item, path)}
                    variant="resource"
                    handleFavorite={(event) => handleFavorite(event)}
                    favourite
                  />
                </Grid>
              );
            })}
          </Grid>
          {count > 1 && (
            <div className="resources__pagination">
              <Pagination
                count={count}
                page={page}
                onChangePage={handlePageChange}
              />
            </div>
          )}
        </div>
      </Fade>
    </div>
  );
};

export default Resources;
