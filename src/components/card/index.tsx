import React from "react";
import moment from "moment";

// Components
import Image from "../../components/image";

// Styles
import "./card.scss";

interface Props {
  resource: any;
  onClick?: () => void;
  variant?: string;
}

const Card: React.FC<Props> = ({ resource, onClick, variant }) => {
  // Class definitions
  const baseClass = "card";
  const variantClass = variant ? `${baseClass}--${variant}` : "";
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
        >
          <h3 className="card__title">{resource?.name || resource?.title}</h3>
          {resource?.["first_air_date"] && <p className="card__date">{moment(resource?.["first_air_date"]).format("YYYY")}</p>}
          {resource?.["release_date"] && <p className="card__date">{moment(resource?.["release_date"]).format("YYYY")}</p>}
          {resource?.["known_for_department"] && <p className="card__date">{resource["known_for_department"]}</p>}
        </button>
      </div>
    </div>
  );
};

export default Card;
