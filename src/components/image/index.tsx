import React from "react";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./image.scss";

interface Props {
  resource: any;
  size?: "xsmall" | "small" | "medium" | "large ";
  scale?: boolean;
}

const Image: React.FC<Props> = ({ resource, size, scale }) => {
  const baseClass = "image";
  const sizeClass = `image--${size}`;
  const scaleClass = scale ? "image--scale" : "";
  const classes = [baseClass, sizeClass, scaleClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="image"
    >
      <img
        src={
          resource["poster_path"] || resource["profile_path"]
            ? `https://image.tmdb.org/t/p/original/${resource["poster_path"] || resource["profile_path"]}`
            : defaultPlaceholder
        }
        alt={resource.title}
      />
    </div>
  );
};

export default Image;
