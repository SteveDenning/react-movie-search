import React from "react";

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
  const [favorite, setFavorite] = React.useState(isFavorite);
  const [open, setOpen] = React.useState(false);

  const user = JSON.parse(sessionStorage.getItem("user") || null);

  const handleFavoriteClick = (favorite) => {
    if (user === null) {
      setOpen(true);
      return;
    }
    setFavorite(!favorite);
    handleFavorite(!favorite);
  };

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
        <p>Please log in to add to your favourites</p>
      </Modal>
    </>
  );
};

export default AddToFavorites;
