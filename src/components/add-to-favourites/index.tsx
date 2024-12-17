import React, { useEffect, useState } from "react";

// Services
import { addFavourite } from "../../services/addFavourite";
import { getFavourites } from "../../services/getFavourites";

// Components
import Button from "../../components/button";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./add-to-favourites.scss";

interface Props {
  resource: any;
  variant?: "card" | undefined;
}

const AddToFavourites: React.FC<Props> = ({ resource, variant }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const user = JSON.parse(sessionStorage.getItem("user") || null);
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  // Class definitions
  const baseClass = "add-to-favourites";
  const variantClass = variant ? `button--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  const handleFavorite = () => {
    const body = {
      media_type: type,
      media_id: resource.id,
      favorite: !isFavourite,
    };

    addFavourite(user.id, body)
      .then(() => {
        getFavouritesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavouritesList = () => {
    if (user) {
      getFavourites(user.id, type)
        .then((response) => {
          const isFavourite = response?.data.results.find((favourite) => favourite.id === resource.id);
          setIsFavourite(isFavourite);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getFavouritesList();
  }, [resource]);

  return (
    <>
      {user && type !== "person" && (
        <Button
          className={classes}
          testId="add-to-favourites"
          color="red"
          variant="icon"
          onClick={() => handleFavorite()}
        >
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      )}
    </>
  );
};

export default AddToFavourites;
