import React from "react";
import moment from "moment";

// Components
import AddToFavorites from "../../components/add-to-favorites";
import Image from "../../components/image";

// Styles
import "./card.scss";

interface Props {
  resource: any;
  onClick?: () => void;
  variant?: "banner" | "resource";
  handleFavorite?: (resource: any) => void;
  favorite?: boolean;
}

const Card: React.FC<Props> = ({ resource, onClick, variant, handleFavorite }) => {
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  // Class definitions
  const baseClass = "card";
  const variantClass = variant ? `card--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");
  const isPerson = Object.prototype.hasOwnProperty.call(resource, "gender");

  return (
    <div
      className={classes}
      data-testid="card"
    >
      <Image
        resource={resource}
        id={resource.id}
      />
      <div className="card__overlay">
        <div
          className="card__content"
          onClick={onClick}
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
          {resource?.["known_for_department"] && <p className="card__info">{resource["known_for_department"]}</p>}
          <p className="card__info">{resource?.character}</p>
        </div>
        {user && !isPerson && (
          <AddToFavorites
            handleFavorite={() => handleFavorite(resource)}
            isFavorite={resource?.favorite}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
