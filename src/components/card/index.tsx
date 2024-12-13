import React from "react";
import moment from "moment";

// Components
import Image from "../../components/image";

// Styles
import "./card.scss";

interface Props {
  resource: any;
  onClick?: () => void;
  variant?: "banner" | "resource";
}

const Card: React.FC<Props> = ({ resource, onClick, variant }) => {
  // Class definitions
  const baseClass = "card";
  const variantClass = `card--${variant}`;
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="card"
    >
      <Image resource={resource} />
      <div className="card__overlay">
        <button
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
        </button>
      </div>
    </div>
  );
};

export default Card;
