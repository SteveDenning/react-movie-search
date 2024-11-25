import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

// Utils
import { getAllMediaFromSearch } from "../../utils/get-resources";

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

  const [formData, setFormData] = useState({
    query: "",
    mediaType: "multi",
  });

  const navigate = useNavigate();

  const updateQuery = (key, value) => {
    params.set(key, value);
    sessionStorage.setItem(key, value);
    setSearchParams(params);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (suggestions.length) {
      updateQuery("query", formData.query);
      if (window.location.pathname !== config.searchResults.path) {
        window.location.href = `${config.searchResults.path}/${formData.mediaType}?query=${formData.query}`;
      }
    }
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      setFormData({
        ...formData,
        query: event.target.value,
      });

      getAllMediaFromSearch(`${formData.mediaType}?query=${formData.query}`)
        .then((response: any) => {
          setSuggestions(response.data.results.slice(0, 10));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const clear = () => {
    setSuggestions([]);
    setSearchParams({});
    removeQueryParam("query");
    sessionStorage.removeItem("query");
    window.location.href = "/";
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
          value={formData.query || ""}
          onChange={(e) => {
            setFormData({
              ...formData,
              query: e.target.value,
            });
          }}
        />
      </form>
      {!!formData.query && (
        <Button
          variant="icon"
          className="search__form-clear"
          type="reset"
          onClick={clear}
        >
          <ClearIcon />
        </Button>
      )}

      <Fade in={!!suggestions.length && !!formData.query}>
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
                      />
                      <div className="search__options-content">
                        <p>{suggestion["original_title"] || suggestion["name"]}</p>
                        <p className="search__options-list-item-year">{moment(suggestion["release_date"]).format("YYYY")}</p>
                      </div>
                      <div className="search__options-media-icon">
                        {suggestion["media_type"] === "tv" ? <TvIcon /> : suggestion["media_type"] === "movie" ? <TheatersIcon /> : <PersonIcon />}
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
