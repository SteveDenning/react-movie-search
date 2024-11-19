import React from "react";
import moment from "moment";

// Components
import Button from "../../components/button";
import Image from "../../components/image";

// Styles
import "./card.scss";

interface Props {
  resource: any;
  imagePath: string;
}

const Card: React.FC<Props> = ({ imagePath, resource }) => {
  return (
    <div
      className="card"
      data-testid="card"
    >
      <Image
        resource={resource}
        content
        imagePath={imagePath}
      />
      <div className="card__content">
        <h3 className="card__title">{resource?.name || resource?.title}</h3>
        {resource["first_air_date"] && <p className="card__date">{moment(resource["first_air_date"]).format("YYYY")}</p>}
        {resource["release_date"] && <p className="card__date">{moment(resource["release_date"]).format("YYYY")}</p>}
        {resource["known_for_department"] && <p className="card__date">{resource["known_for_department"]}</p>}
        <div className="card__content-button">
          <Button>View</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
