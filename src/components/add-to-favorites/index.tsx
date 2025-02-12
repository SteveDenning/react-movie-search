import React, { useEffect, useState } from "react";

// Components
import Button from "../button";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./add-to-favorites.scss";

interface Props {
  isFavorite: boolean;
  handleFavorite: (boolean) => void;
  user: any;
}

const AddToFavorites: React.FC<Props> = ({ isFavorite, handleFavorite, user }) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavoriteClick = (favorite) => {
    setFavorite(!favorite);
    handleFavorite(!favorite);
  };

  const openModal = () => {
    alert("Please log in to add to favorites.");
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <Button
      className="add-to-favorites"
      testId="add-to-favorites"
      variant="icon"
      onClick={() => (user ? handleFavoriteClick(favorite) : openModal())}
    >
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default AddToFavorites;
