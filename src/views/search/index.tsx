import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Components
import Button from "../../components/button";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// MUI
import { Fade } from "@mui/material";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./search.scss";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(sessionStorage.getItem("query") || "");

  const navigate = useNavigate();
  const params = new URLSearchParams(searchParams);

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
    sessionStorage.removeItem("query");
  };

  useEffect(() => {
    if (sessionStorage.getItem("query")) {
      updateQuery("query", sessionStorage.getItem("query"));
    }
  }, []);

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
        <label
          htmlFor="search"
          aria-labelledby="search"
          className="sr-only"
        >
          Search for media
        </label>
        <input
          id="search"
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
                    className="search__options-list-item"
                    key={index}
                    // onClick={() => {
                    //   window.location.href = `/details/${suggestion["media_type"]}/${suggestion["id"]}`;
                    // }}
                  >
                    <Button
                      href={`/details/${suggestion["media_type"]}/${suggestion["id"]}`}
                      variant="null"
                    >
                      <img
                        src={
                          suggestion["poster_path"] || suggestion["profile_path"]
                            ? `https://image.tmdb.org/t/p/original/${suggestion["poster_path"] || suggestion["profile_path"]}`
                            : defaultPlaceholder
                        }
                        alt={suggestion.title || suggestion.name}
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
                    </Button>
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
