import React from "react";
import moment from "moment";

// Styles
import "./card.scss";

interface Props {
  children?: React.ReactNode;
  resource: any;
}

const Card: React.FC<Props> = ({ children, resource }) => {
  // Add class variants
  return (
    <div
      className="card"
      data-testid="card"
    >
      {children}
      <div className="card__content">
        <p className="card__title">{resource.name || resource.title}</p>
        {resource["first_air_date"] && <p className="card__date">{moment(resource["first_air_date"]).format("YYYY")}</p>}
        {resource["release_date"] && <p className="card__date">{moment(resource["release_date"]).format("YYYY")}</p>}
        {resource["known_for_department"] && <p className="card__date">{resource["known_for_department"]}</p>}
      </div>
    </div>
  );
};

export default Card;
