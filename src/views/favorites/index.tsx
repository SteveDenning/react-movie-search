import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Components
import List from "../../components/list";
import SectionHeading from "../../components/section-heading";
import Tabs from "../../components/tabs";

// MUI Components
import { Container, Fade } from "@mui/material";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// Services
import { getFavorites } from "../../services/favorites";
import { updateFavorite } from "../../services/favorites";

// Styles
import "./favorites.scss";

interface Props {
  children?: React.ReactNode;
}

const Favorites: React.FC<Props> = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any>([]);
  const [favoriteTv, setFavoriteTv] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState("movies");

  const user = useUser();

  if (!user) {
    window.location.href = "/";
  }

  const getFavoritesList = (type: string) => {
    if (user) {
      getFavorites(user, type)
        .then((response) => {
          if (type === "movies") {
            setFavoriteMovies(response.data.results);
          } else {
            setFavoriteTv(response.data.results);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDelete = (type: string, id: string) => {
    const body = {
      media_type: pluralize.singular(type),
      media_id: id,
      favorite: false,
    };

    updateFavorite(user, body)
      .then(() => {
        getFavoritesList(type);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTabChange = (tab: { label: string; value: string }) => {
    setSelectedTab(tab.value);
  };

  useEffect(() => {
    getFavoritesList("movies");
    getFavoritesList("tv");
  }, []);

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          {resource.length ? (
            <List
              variant="tile"
              resources={resource}
              onClick={(item) => handleDelete(type, item)}
            />
          ) : (
            <h3
              className="favorites__empty-message"
              data-testid="favorites-empty-message"
            >
              You currently have no favourite {type}
            </h3>
          )}
        </div>
      </Fade>
    );
  };

  return (
    <Container>
      <div
        className="favorites"
        data-testid="favorites"
      >
        <SectionHeading
          heading="Favourites"
          backButton
        />
        <Tabs
          tabs={[
            { label: "Movies", value: "movies" },
            { label: "TV", value: "tv" },
          ]}
          onClick={handleTabChange}
          initialSelection="movies"
        />
        <div className="favorites__inner">
          {selectedTab === "movies" && renderTab(favoriteMovies, "movies")}
          {selectedTab === "tv" && renderTab(favoriteTv, "tv")}
        </div>
      </div>
    </Container>
  );
};

export default Favorites;
