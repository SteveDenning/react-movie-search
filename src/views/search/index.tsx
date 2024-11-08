import React, { useState } from "react";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import Image from "../../components/image";

// MUI
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Fade } from "@mui/material";

// Styles
import "./search.scss";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const value = event.target[0].value;

    setValue(value);
    updateQuery("query", value);
    setShowOptions(false);
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      getAllMedia(event.target.value)
        .then((response: any) => {
          setSuggestions(response.data.results.slice(0, 10));
          setShowOptions(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const clear = () => {
    setValue("");
    navigate("/");
    setSuggestions([]);
    setShowOptions(false);
  };

  return (
    <div
      className="search"
      data-testid="search"
    >
      <form
        className="search__form"
        onChange={(e) => {
          handleSuggestions(e);
        }}
        onSubmit={handleSubmit}
      >
        <input
          className="search__form-input"
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
      {!!value && (
        <Button
          variant="icon"
          type="reset"
          onClick={clear}
        >
          <ClearIcon sx={{ color: "#ccc", fontSize: 20 }} />
        </Button>
      )}

      <Fade in={!!suggestions.length && showOptions && !!value}>
        <div>
          {!!suggestions.length && (
            <ul className="search__options-list">
              {suggestions.map((suggestion: any, index: number) => {
                return (
                  <li
                    tabIndex={1}
                    className="search__options-list-item"
                    key={index}
                    onClick={() => {
                      window.location.href = `/details/${suggestion["media_type"]}/${suggestion["id"]}`;
                    }}
                  >
                    <Image
                      resource={suggestion}
                      size="xsmall"
                    />
                    <div>
                      <p>{suggestion["original_title"] || suggestion["name"]}</p>
                      <p className="search__options-list-item-year">{moment(suggestion["release_date"]).format("YYYY")}</p>
                    </div>
                    <div className="search__options-media-icon">
                      {suggestion["media_type"] === "tv" ? (
                        <TvIcon sx={{ color: "#ccc", fontSize: 20 }} />
                      ) : suggestion["media_type"] === "movie" ? (
                        <TheatersIcon sx={{ color: "#ccc", fontSize: 20 }} />
                      ) : (
                        <PersonIcon sx={{ color: "#ccc", fontSize: 20 }} />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Fade>
    </div>
  );
};

export default Search;
