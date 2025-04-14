import React, { useEffect, useState } from "react";
import pluralize from "pluralize";

// Components
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import Modal from "../../components/modal";
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
  const [mediaType, setMediaType] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const isAllSelected = selectedItems.length === mediaType.length;

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
            setMediaType(response.data.results);
          } else {
            setFavoriteTv(response.data.results);
          }
          setIsBulkDelete(false);
          setSelectedItems([]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteOne = (type: string, id: string) => {
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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => {
          const body = {
            media_type: pluralize.singular(selectedTab),
            media_id: id,
            favorite: false,
          };
          return updateFavorite(user, body);
        }),
      );

      getFavoritesList(selectedTab);
    } catch (error) {
      console.error("Failed to delete some items:", error);
    }
  };

  const handleTabChange = (tab: { label: string; value: string }) => {
    tab.value === "movies" ? setMediaType(favoriteMovies) : setMediaType(favoriteTv);
    setIsBulkDelete(false);
    setSelectedItems([]);
    setSelectedTab(tab.value);
  };

  const handleToggleAllItems = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(mediaType.map((item) => item.id));
    }
  };

  const handleToggleOneItem = (id) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
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
            <ul
              className="favorites__list"
              data-testid="favorites-list"
            >
              {resource.map((item: any) => {
                return (
                  <li key={item.id}>
                    <Tile
                      resource={item}
                      handleDelete={() => handleDeleteOne(item.id, type)}
                    >
                      {isBulkDelete && (
                        <Checkbox
                          label={item.title || item.name}
                          name={item.title || item.name}
                          noLabel
                          id={`checkbox-${item.id}`}
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleToggleOneItem(item.id)}
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
          {mediaType.length > 1 && (
            <>
              {selectedItems.length > 0 && (
                <Button
                  color="red"
                  variant="filled"
                  className="button--icon-button"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Selected
                </Button>
              )}
              {isBulkDelete && (
                <Button
                  className="button--icon-button"
                  onClick={handleToggleAllItems}
                >
                  Select All
                </Button>
              )}
              <Button
                className="button--icon-button"
                onClick={() => {
                  setIsBulkDelete(!isBulkDelete);
                  setMediaType(selectedTab === "movies" ? favoriteMovies : favoriteTv);
                  isBulkDelete && setSelectedItems([]);
                }}
              >
                {isBulkDelete ? "Cancel" : "Bulk Select"}
              </Button>
            </>
          )}
        </div>
        <div className="favorites__inner">
          {selectedTab === "movies" && renderTab(favoriteMovies, "movies")}
          {selectedTab === "tv" && renderTab(favoriteTv, "tv")}
        </div>
      </div>
      <Modal
        id="delete-favorite-modal"
        open={isDeleteModalOpen}
        handleClose={() => {
          setIsDeleteModalOpen(false);
        }}
        variant={["small"]}
      >
        <h3 style={{ textAlign: "center", marginTop: "30px" }}>
          Are you sure you want to remove {selectedItems.length} {pluralize("favourites", selectedItems.length)}?
          <br />
        </h3>

        <div className="modal__action-buttons">
          <Button
            testId="cancel-button"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteSelected();
              setIsDeleteModalOpen(false);
            }}
            color="red"
            variant="filled"
            testId="delete-button"
          >
            Remove
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Favorites;
