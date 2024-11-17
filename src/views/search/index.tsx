import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Config
import { config } from "../../config/routes";

// Components
import Button from "../../components/button";
import Image from "../../components/image";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(params.get("query"));

  const navigate = useNavigate();
  const iconProps = {
    sx: { color: "#ccc", fontSize: 20 },
  };

  const updateQuery = (key, value) => {
    params.set(key, value);

    setSearchParams(params);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (suggestions.length) {
      const searchTerm = event.target[0].value;

      setSearchTerm(searchTerm);
      updateQuery("query", searchTerm);
      setSuggestions([]);
      sessionStorage.setItem("query", searchTerm);

      if (window.location.pathname !== config.searchResults.path) {
        window.location.href = `${config.searchResults.path}${window.location.search}`;
      }
    }
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      getAllMedia(`?query=${event.target.value}`)
        .then((response: any) => {
          setSuggestions(response.data.results.slice(0, 10));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const clear = () => {
    setSearchTerm("");
    setSuggestions([]);
    removeQueryParam("query");
    sessionStorage.removeItem("query");
    window.location.href = "/";
    setSearchParams({});
  };

  const removeQueryParam = (key) => {
    params.delete(key);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
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
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
      {window.location.search && (
        <Button
          variant="icon"
          className="search__form-clear"
          type="reset"
          onClick={clear}
        >
          <ClearIcon sx={{ color: "#ccc", fontSize: 20 }} />
        </Button>
      )}

      <Fade in={!!suggestions.length && !!searchTerm}>
        <div>
          {!!suggestions.length && (
            <ul className="search__options-list">
              {suggestions.map((suggestion: any, index: number) => {
                return (
                  <li
                    className="search__options-list-item"
                    key={index}
                  >
                    <Button
                      href={`/details/${suggestion["media_type"]}/${suggestion["id"]}`}
                      variant="null"
                    >
                      <Image
                        resource={suggestion}
                        size="xsmall"
                        imagePath={suggestion["poster_path"] ? "poster_path" : "profile_path"}
                      />
                      <div className="search__options-content">
                        <p>{suggestion["original_title"] || suggestion["name"]}</p>
                        <p className="search__options-list-item-year">{moment(suggestion["release_date"]).format("YYYY")}</p>
                      </div>
                      <div className="search__options-media-icon">
                        {suggestion["media_type"] === "tv" ? (
                          <TvIcon sx={iconProps} />
                        ) : suggestion["media_type"] === "movie" ? (
                          <TheatersIcon sx={iconProps} />
                        ) : (
                          <PersonIcon sx={iconProps} />
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
