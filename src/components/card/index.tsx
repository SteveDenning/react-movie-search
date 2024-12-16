import React from "react";
import moment from "moment";

// Components
import Button from "../../components/button";
import Image from "../../components/image";

// MUI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styles
import "./card.scss";

interface Props {
  resource: any;
  onClick?: () => void;
  variant?: "banner" | "resource";
  handleFavorite?: (isFavorite: boolean) => void;
  favourite?: boolean;
}

const Card: React.FC<Props> = ({ resource, onClick, variant, handleFavorite, favourite }) => {
  const user = JSON.parse(sessionStorage.getItem("user") || null);

  // Class definitions
  const baseClass = "card";
  const variantClass = variant ? `card--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

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
        {user && favourite && (
          <Button
            className="card__favourite"
            color="red"
            variant="icon"
            onClick={() => handleFavorite(resource?.favourite)}
          >
            {resource?.favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
