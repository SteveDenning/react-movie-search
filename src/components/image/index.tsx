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
  size?: "xsmall" | "small" | "medium" | "large";
  variant?: string;
  onClick?: () => void;
  src?: string;
  alt?: string;
  className?: string;
}

const Image: React.FC<Props> = ({ resource, size, variant, onClick, src, alt, className }) => {
  const mediaType = useDefineMediaType(resource);
  const screenSize = useScreenSize();

  const isPerson = mediaType === "person";
  const isMobile = screenSize.width <= 480;
  const imageSrc = resource["poster_path"] || resource["profile_path"];
  const imagePath = imageSrc ? `${process.env.REACT_APP_TMDB_IMAGE_PATH}${imageSrc}` : isPerson ? avatarPlaceholder : mediaPlaceholder;

  // Class Definitions
  const baseClass = "image";
  const mobileClass = isMobile ? "image--mobile" : "";
  const sizeClass = size ? `image--${size}` : "";
  const variantClass = variant ? `image--${variant}` : "";
  const classes = [baseClass, sizeClass, mobileClass, variantClass, className].filter(Boolean).join(" ");

  return (
    <img
      id={resource.id}
      className={classes}
      data-testid="image"
      src={src || imagePath}
      alt={alt || resource["profile_path"] ? `Actor - ${resource.name}` : `Media show - ${resource.name || resource.title}`}
      onClick={onClick}
    />
  );
};

export default Image;
