import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder-1.png";

// Styles
import "./image.scss";

interface Props {
  id?: string;
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large";
  scale?: boolean;
  banner?: boolean;
}

const Image: React.FC<Props> = ({ resource, size, scale, banner }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  const baseClass = "image";
  const sizeClass = size ? `image--${size}` : "";
  const bannerClass = banner ? "image--banner" : "";
  const scaleClass = scale ? "image--scale" : "";
  const mobileClass = isMobile ? "image--mobile" : "";
  const classes = [baseClass, sizeClass, scaleClass, mobileClass, bannerClass].filter(Boolean).join(" ");
  const imageSrc = resource["poster_path"] || resource["profile_path"] || resource["backdrop_path"];

  return (
    <div
      className={classes}
      data-testid="image"
    >
      <img
        src={imageSrc ? `https://image.tmdb.org/t/p/original/${banner ? resource["backdrop_path"] : imageSrc}` : defaultPlaceholder}
        alt={resource["profile_path"] ? `Actor - ${resource.name}` : ""}
      />
    </div>
  );
};

export default Image;
