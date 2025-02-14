import React from "react";
import moment from "moment";

// Components
import AddToFavorites from "../add-to-favorites";
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
}

const Card: React.FC<Props> = ({ resource, onClick, variant, handleFavorite }) => {
  const user = JSON.parse(sessionStorage.getItem("user") || null);
  const mediaType = useDefineMediaType(resource);

  // Class definitions
  const baseClass = "card";
  const variantClass = variant ? `card--${variant}` : "";
  const personClass = mediaType === "person" ? "card--person" : "";
  const classes = [baseClass, variantClass, personClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="card"
    >
      <div
        className="card__wrapper"
        onClick={onClick}
      >
        <Image
          resource={resource}
          id={resource.id}
        />
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
            {resource?.["first_air_date"] && (
              <p
                className="card__info"
                data-testid="first-air-date"
              >
                {moment(resource?.["first_air_date"]).format("YYYY")}
              </p>
            )}
            {resource?.["release_date"] && <p className="card__info">{moment(resource?.["release_date"]).format("YYYY")}</p>}
            {resource?.job && <p className="card__info">{resource.job}</p>}
            {resource?.character && <p className="card__info">{resource?.character}</p>}
          </div>
        </div>
      </div>
      {user && mediaType !== "person" && (
        <AddToFavorites
          handleFavorite={() => handleFavorite(resource)}
          isFavorite={resource?.favorite}
        />
      )}
    </div>
  );
};

export default Card;
