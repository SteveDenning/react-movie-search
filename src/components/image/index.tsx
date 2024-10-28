import React from "react";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./image.scss";

interface Props {
  resource: any;
  size?: "small" | "medium" | "large";
}

const Image: React.FC<Props> = ({ resource, size = "small" }) => {
  const baseClass = "image";
  const sizeClass = `image--${size}`;
  const classes = [baseClass, sizeClass].join(" ");

  return (
    <div className={classes}>
      <img
        src={resource["poster_path"] ? `https://image.tmdb.org/t/p/original/${resource["poster_path"]}` : defaultPlaceholder}
        alt={resource.title}
      />
    </div>
  );
};

export default Image;
