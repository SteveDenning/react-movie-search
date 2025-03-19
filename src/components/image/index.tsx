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
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large" | "fill" | "avatar";
  variant?: string;
  onClick?: () => void;
  src?: string;
}

const Image: React.FC<Props> = ({ resource, size = "fill", variant, onClick, src = "" }) => {
  const mediaType = useDefineMediaType(resource);
  const screenSize = useScreenSize();

  const isPerson = mediaType === "person";
  const isAvatar = Object.prototype.hasOwnProperty.call(resource, "author_details");
  const isMobile = screenSize.width <= 480;

  const imageSrc = resource["poster_path"] || resource["profile_path"];
  const imagePath = imageSrc ? `${process.env.REACT_APP_TMDB_IMAGE_PATH}${imageSrc}` : isPerson || isAvatar ? avatarPlaceholder : mediaPlaceholder;

  // Class Definitions
  const baseClass = "image";
  const mobileClass = isMobile ? "image--mobile" : "";
  const avatarClass = isAvatar ? "image--avatar" : "";
  const sizeClass = size ? `image--${size}` : "";
  const variantClass = variant ? `image--${variant}` : "";
  const classes = [baseClass, sizeClass, mobileClass, variantClass, avatarClass].filter(Boolean).join(" ");

  return (
    <img
      className={classes}
      id={resource.id}
      src={src || imagePath}
      alt={resource["profile_path"] ? `Actor - ${resource.name}` : resource.name || resource.title}
      onClick={onClick}
    />
  );
};

export default Image;
