import React from "react";

// Components
import Button from "../button";

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
  return (
    <Button
      className="add-to-favorites"
      testId="add-to-favorites"
      variant="icon"
      onClick={() => handleFavorite(isFavorite)}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default AddToFavorites;
