import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";
import useDefineMediaType from "../../utils/use-define-media-type";

// Assets
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";
import mediaPlaceholder from "../../assets/images/default-placeholder.png";

// Styles
import "./image.scss";

interface Props {
  id: any;
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large" | "fill";
  variant?: "banner";
  onClick?: () => void;
}

const Image: React.FC<Props> = ({ resource, size = "fill", variant, onClick }) => {
  const mediaType = useDefineMediaType(resource);
  const isPerson = mediaType === "person";
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;
  const isBanner = variant === "banner";

  const imageSrc = resource["poster_path"] || resource["profile_path"] || resource["backdrop_path"];
  const imagePath = imageSrc
    ? `${process.env.REACT_APP_TMDB_IMAGE_PATH}${isBanner ? resource["backdrop_path"] : imageSrc}`
    : isPerson
    ? avatarPlaceholder
    : mediaPlaceholder;

  // Class Definitions
  const baseClass = "image";
  const mobileClass = isMobile ? "image--mobile" : "";
  const sizeClass = size ? `image--${size}` : "";
  const variantClass = variant ? `image--${variant}` : "";
  const classes = [baseClass, sizeClass, mobileClass, variantClass].filter(Boolean).join(" ");

  return (
    <img
      className={classes}
      data-testid="image"
      src={imagePath}
      alt={resource["profile_path"] ? `Actor - ${resource.name}` : resource.name || resource.title}
      onClick={onClick}
    />
  );
};

export default Image;
