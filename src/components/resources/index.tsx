import React, { useEffect, useState } from "react";

// Services
import { getFavorites } from "../../services/getFavorites";
import { addFavourite } from "../../services/addFavorite";

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
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  /////////////////////////////

  const [favourites, setFavorites] = useState([]);
  const [items, setItems] = useState([]);

  const handleFavorite = (id: string, event) => {
    const body = {
      media_type: type,
      media_id: id,
      favourite: !event,
    };

    addFavourite(user.id, body)
      .then((response) => {
        console.log(response);
        getFavoritesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavoritesList = () => {
    getFavorites(user.id, type)
      .then((response) => {
        setFavorites(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const updatedArray = resources.map((item1) => {
      const match = favourites.find((item2) => item2.id === item1.id);
      return match ? { ...item1, favourite: true } : item1;
    });

    setItems(updatedArray);
  }, [favourites]);

  useEffect(() => {
    if (user && type !== "person") {
      getFavoritesList();
    } else {
      setItems(resources);
    }
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
                    onClick={() => (window.location.href = `/details/${path}/${item.id}`)}
                    variant="resource"
                    handleFavorite={(event) => handleFavorite(item.id, event)}
                    favourite={type !== "person"}
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
      <Backdrop open={!!loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Resources;
