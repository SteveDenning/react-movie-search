import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Utils
import useUpdateSearchParams from "../../utils/use-search-params";

// Services
import { getFavourites } from "../../services/getFavourites";
import { addFavourite } from "../../services/addFavourite";

// MUI Components
import { Container, Fade } from "@mui/material";

// Components
import List from "../../components/list";
import Tabs from "../../components/tabs";

// Styles
import "./favourites.scss";

interface Props {
  children?: React.ReactNode;
}

const Favourites: React.FC<Props> = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<any>([]);
  const [favouriteTv, setFavouriteTv] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState("movies");

  const user = JSON.parse(sessionStorage.getItem("user") || null);
  const updateSearchParam = useUpdateSearchParams();

  const getFavouritesList = (type: string) => {
    getFavourites(user.id, type)
      .then((response) => {
        if (type === "movies") {
          setFavouriteMovies(response.data.results);
        } else {
          setFavouriteTv(response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (type: string, id: string) => {
    const body = {
      media_type: pluralize.singular(type),
      media_id: id,
      favorite: false,
    };

    addFavourite(user.id, body)
      .then(() => {
        getFavouritesList(type);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTabChange = (tab: { label: string; value: string }) => {
    updateSearchParam("type", tab.value);
    setSelectedTab(tab.value);
  };

  useEffect(() => {
    if (user) {
      getFavouritesList("movies");
      getFavouritesList("tv");
      updateSearchParam("type", "movies");
    }
  }, []);

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          {resource.length ? (
            <List
              variant="list-panel"
              items={resource}
              onClick={(item) => handleDelete(type, item)}
            />
          ) : (
            <h3>Add something, you magnificent waffle!</h3>
          )}
        </div>
      </Fade>
    );
  };

  return (
    <Container>
      {user ? (
        <div
          className="favourites"
          data-testid="favourites"
        >
          <Tabs
            tabs={[
              { label: "Movies", value: "movies" },
              { label: "TV", value: "tv" },
            ]}
            onClick={handleTabChange}
            initialSelection="movies"
          />
          <div className="favourites__inner">
            {selectedTab === "movies" && renderTab(favouriteMovies, "movies")}
            {selectedTab === "tv" && renderTab(favouriteTv, "tv")}
          </div>
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>You need to be logged in to see your favourites. Log in (TODO - Login)</h2>
      )}
    </Container>
  );
};

export default Favourites;
