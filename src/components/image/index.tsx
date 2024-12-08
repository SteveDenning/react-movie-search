import React, { useState } from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Components
import Modal from "../../components/modal";

// Assets
import mediaPlaceholder from "../../assets/images/placeholder-3.jpeg";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";

// Styles
import "./image.scss";

interface Props {
  id?: string;
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large";
  variant?: string;
}

const Image: React.FC<Props> = ({ resource, size, variant }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isPerson = Object.prototype.hasOwnProperty.call(resource, "gender");

  const getPlaceholder = () => {
    if (isPerson) {
      return avatarPlaceholder;
    }
    return mediaPlaceholder;
  };

  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  // Class Definitions
  const baseClass = "image";
  const sizeClass = size ? `image--${size}` : "";
  const variantClass = variant ? `image--${variant}` : "";
  const mobileClass = isMobile ? "image--mobile" : "";
  const classes = [baseClass, sizeClass, mobileClass, variantClass].filter(Boolean).join(" ");
  const imageSrc = resource["poster_path"] || resource["profile_path"] || resource["backdrop_path"];
  const imagePath = imageSrc
    ? `https://image.tmdb.org/t/p/original/${variant === "banner" ? resource["backdrop_path"] : imageSrc}`
    : getPlaceholder();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={classes}
      data-testid="image"
    >
      <img
        src={imagePath}
        alt={resource["profile_path"] ? `Actor - ${resource.name}` : ""}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        id={resource.id}
        open={isOpen}
        handleClose={handleClose}
        variant={["image"]}
      >
        <img
          src={imagePath}
          alt={resource["profile_path"] ? `Actor - ${resource.name}` : ""}
        />
      </Modal>
    </div>
  );
};

export default Image;
