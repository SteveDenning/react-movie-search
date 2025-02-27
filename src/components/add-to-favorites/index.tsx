import React, { useEffect, useState } from "react";

// Components
import Button from "../button";
import Modal from "../modal";

// Hocs
import { useUser, useUserUpdate } from "../../hocs/with-user-provider";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./add-to-favorites.scss";

interface Props {
  isFavorite: boolean;
  handleFavorite: (boolean) => void;
}

const AddToFavorites: React.FC<Props> = ({ isFavorite, handleFavorite }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useUser();
  const handleUpdateUser = useUserUpdate();

  const handleFavoriteClick = (favorite) => {
    setFavorite(!favorite);
    handleFavorite(!favorite);
  };

  const openModal = () => {
    setIsOpen(true);
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
        onClick={() => (user ? handleFavoriteClick(favorite) : openModal())}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>
      <Modal
        id="login-modal"
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        variant={["small"]}
      >
        <p className="add-to-favorites__login-message">
          You must{" "}
          <Button
            variant="link"
            // @ts-ignore
            onClick={handleUpdateUser}
            testId="navigation-action-login"
          >
            login
          </Button>{" "}
          to use this feature
        </p>
      </Modal>
    </>
  );
};

export default AddToFavorites;
