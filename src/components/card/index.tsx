import React from "react";
import moment from "moment";

// Components
import AddToFavorites from "../add-to-favorites";
import Button from "../../components/button";
import Image from "../image";

// Styles
import "./card.scss";

// Utils
import useDefineMediaType from "../../utils/use-define-media-type";

interface Props {
  resource: any;
  onClick?: () => void;
  variant?: "banner" | "resource" | "details";
  handleFavorite?: (isFavorite: boolean) => void;
  favorite?: boolean;
  user?: any;
}

const Card: React.FC<Props> = ({ resource, onClick, variant, handleFavorite, user }) => {
  const mediaType = useDefineMediaType(resource);
  const isPerson = mediaType === "person";

  // Class definitions
  const baseClass = "card";
  const variantClass = variant ? `card--${variant}` : "";
  const personClass = isPerson ? "card--person" : "";
  const classes = [baseClass, variantClass, personClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="card"
    >
      <Button
        className="card__cover"
        onClick={onClick}
        tabIndex={0}
        variant="plain"
      >
        <span
          className="sr-only"
          aria-hidden={true}
        >
          Click to open
        </span>
      </Button>
      <div className="card__wrapper">
        <Image resource={resource} />
        {!isPerson && !resource.poster_path && (
          <h3
            className="card__title card__title--no-image"
            data-testid="card-title"
          >
            {resource?.name || resource?.title}
          </h3>
        )}
        <div className="card__overlay">
          <div
            className="card__content"
            data-testid="card-content"
          >
            <h3
              className="card__title"
              data-testid="card-title"
            >
              {resource?.name || resource?.title}
            </h3>
            {resource?.first_air_date && (
              <p
                className="card__info"
                data-testid="first-air-date"
              >
                {moment(resource?.first_air_date).format("YYYY")}
              </p>
            )}
            {resource?.release_date && <p className="card__info">{moment(resource?.release_date).format("YYYY")}</p>}
            {resource?.job && <p className="card__info">{resource.job}</p>}
            {resource?.character && <p className="card__info">{resource?.character}</p>}
          </div>
        </div>
      </div>
      {mediaType !== "person" && resource && (
        <AddToFavorites
          handleFavorite={() => handleFavorite(resource)}
          isFavorite={resource?.favorite}
          user={user}
        />
      )}
    </div>
  );
};

export default Card;
