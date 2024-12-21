import React from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./add-to-favourites.scss";

interface Props {
  isFavourite: boolean;
  handleFavorite: (isFavourite) => void;
}

const AddToFavourites: React.FC<Props> = ({ isFavourite, handleFavorite }) => {
  return (
    <Button
      className="add-to-favourites"
      testId="add-to-favourites"
      variant="icon"
      onClick={() => handleFavorite(isFavourite)}
    >
      {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default AddToFavourites;
