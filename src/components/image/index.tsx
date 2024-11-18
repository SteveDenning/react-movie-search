import React from "react";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./image.scss";

interface Props {
  id?: string;
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large";
  scale?: boolean;
  content?: boolean;
  imagePath?: string;
}

const Image: React.FC<Props> = ({ resource, size, scale, content, imagePath, id }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.width <= 480;

  const baseClass = "image";
  const sizeClass = size ? `image--${size}` : "";
  const contentClass = content ? "image--content" : "";
  const scaleClass = scale ? "image--scale" : "";
  const mobileClass = isMobile ? "image--mobile" : "";
  const classes = [baseClass, sizeClass, scaleClass, mobileClass, contentClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="image"
    >
      <img
        src={resource[imagePath] ? `https://image.tmdb.org/t/p/original/${resource[imagePath]}` : defaultPlaceholder}
        alt={resource.title || resource.name}
      />
    </div>
  );
};

export default Image;
