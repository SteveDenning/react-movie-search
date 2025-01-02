import React, { useEffect, useState } from "react";

// Components
import Button from "../button";
import Modal from "../../components/modal";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./add-to-favorites.scss";

interface Props {
  isFavorite: boolean;
  handleFavorite: (isFavorite) => void;
}

const AddToFavorites: React.FC<Props> = ({ isFavorite, handleFavorite }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const handleFavoriteClick = (favorite) => {
    if (user === null) {
      setOpen(true);
      return;
    }
    setFavorite(!favorite);
    handleFavorite(!favorite);
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <>
      <Button
        className="add-to-favorites"
        testId="add-to-favorites"
        variant="icon"
        onClick={() => handleFavoriteClick(favorite)}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>
      <Modal
        id="test-modal"
        variant={["small"]}
        open={open}
        handleClose={() => setOpen(false)}
      >
        <p className="add-to-favorites__login-message">Please log in to add to your favourites</p>
      </Modal>
    </>
  );
};

export default AddToFavorites;
