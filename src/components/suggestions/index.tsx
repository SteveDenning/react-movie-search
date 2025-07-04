import React from "react";
import moment from "moment";

// Components
import Button from "../button";
import Image from "../image";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./suggestions.scss";

// Types
import { SuggestionType } from "../../models/types";

interface Props {
  options: any[];
  type: string;
}

const AutoSuggestOptions: React.FC<Props> = ({ options, type }) => {
  const handleReleaseDate = (suggestion: SuggestionType) => {
    const dateOfRelease = suggestion?.release_date || suggestion?.first_air_date;
    if (dateOfRelease) {
      return moment(dateOfRelease).format("YYYY");
    }
  };

  return (
    <div
      className="suggestions"
      data-testid="suggestions"
    >
      <ul className="suggestions__list">
        {options.map((suggestion: SuggestionType) => {
          const mediaType = type === "multi" ? suggestion?.media_type : type;

          return (
            <li
              className="suggestions__list-item"
              key={suggestion.id}
            >
              <Button
                href={`/details/${mediaType}/${suggestion.id}`}
                variant="null"
              >
                <Image resource={suggestion} />
                <div className="suggestions__content">
                  <p>{suggestion?.original_title || suggestion?.name}</p>
                  <p className="suggestions__list-item-year">{handleReleaseDate(suggestion)}</p>
                </div>
                <div className="suggestions__media-icon">
                  {mediaType === "tv" ? <TvIcon /> : mediaType === "movie" ? <TheatersIcon /> : <PersonIcon />}
                </div>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutoSuggestOptions;
