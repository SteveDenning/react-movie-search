import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Assets
import mediaPlaceholder from "../../assets/images/default-placeholder.png";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";

// Styles
import "./image.scss";

interface Props {
  id: any;
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large";
  variant?: "banner" | "scale";
  onClick?: () => void;
}

const Image: React.FC<Props> = ({ resource, size, variant, onClick }) => {
  const isPerson = Object.prototype.hasOwnProperty.call(resource, "gender");
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  const getPlaceholder = () => {
    if (isPerson) {
      return avatarPlaceholder;
    }
    return mediaPlaceholder;
  };

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

  return (
    <div
      className={classes}
      data-testid="image"
    >
      <img
        data-testid="image-element"
        src={imagePath}
        alt={resource["profile_path"] ? `Actor - ${resource.name}` : ""}
        onClick={onClick}
      />
    </div>
  );
};

export default Image;
