import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Components
import Button from "../../components/button";
import SectionHeading from "../../components/section-heading";
import Tabs from "../../components/tabs";
import Tile from "../../components/tile";

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
  const [isBulkDelete, setIsBulkDelete] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mediaTypeLength, setMediaTypeLength] = useState(0);
  const isAllSelected = selectedItems.length === mediaTypeLength;

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
    setIsBulkDelete(false);
    setSelectedItems([]);
    tab.value === "movies" ? setMediaTypeLength(favoriteMovies.length) : setMediaTypeLength(favoriteTv.length);
    setSelectedTab(tab.value);
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favoriteMovies.map((item) => item.id));
    }
  };

  const toggleOne = (id) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    getFavoritesList("movies");
    getFavoritesList("tv");
  }, []);

  const renderTab = (resource: any, type: string) => {
    return (
      <Fade in={selectedTab === type}>
        <div>
          {resource.length ? (
            <ul
              className="favorites__list"
              data-testid="favorites-list"
            >
              {resource.map((item: any) => {
                return (
                  <li key={item.id}>
                    <Tile
                      resource={item}
                      handleDelete={() => handleDelete(item.id, type)}
                    >
                      {isBulkDelete && (
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                        />
                      )}
                    </Tile>
                  </li>
                );
              })}
            </ul>
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
        <div className="favorites__action">
          <Button
            variant="link"
            className="button--icon-button"
            onClick={() => {
              setIsBulkDelete(!isBulkDelete);
              setMediaTypeLength(selectedTab === "movies" ? favoriteMovies.length : favoriteTv.length);
              isBulkDelete && setSelectedItems([]);
            }}
          >
            {isBulkDelete ? "Cancel" : "Multi Select"}
          </Button>
          &nbsp;&nbsp;&nbsp;
          {isBulkDelete && (
            <Button
              variant="link"
              className="button--icon-button"
              onClick={toggleAll}
            >
              Select All
            </Button>
          )}
          &nbsp;&nbsp;&nbsp;
          {selectedItems.length > 0 && (
            <Button
              color="red"
              variant="filled"
              className="button--icon-button"
              onClick={() => console.log("Delete selected")}
            >
              Delete Selected
            </Button>
          )}
        </div>
        <div className="favorites__inner">
          {selectedTab === "movies" && renderTab(favoriteMovies, "movies")}
          {selectedTab === "tv" && renderTab(favoriteTv, "tv")}
        </div>
      </div>
    </Container>
  );
};

export default Favorites;
