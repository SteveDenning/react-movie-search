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
import Select from "../../components/select";

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
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [formData, setFormData] = useState({
    searchTerm: "",
    mediaType: { value: "multi", label: "All" },
  });

  const navigate = useNavigate();

  const updateQuery = (key, value) => {
    params.set(key, value);
    sessionStorage.setItem(key, value);
    setSearchParams(params);
  };

  const handleSubmit = () => {
    if (suggestions.length) {
      updateQuery("query", formData.searchTerm);
      updateQuery("mediaType", formData.mediaType.value);
      if (window.location.pathname !== config.searchResults.path) {
        window.location.href = `${config.searchResults.path}/${formData.mediaType.value}?query=${formData.searchTerm}`;
      }
    }
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      setIsSelectDisabled(true);
      setFormData({
        ...formData,
        searchTerm: event.target.value,
      });

      getAllMediaFromSearch(`${formData.mediaType.value}?query=${formData.searchTerm}`)
        .then((response: any) => {
          setSuggestions(response.data.results.slice(0, 10));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsSelectDisabled(false);
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

  const handleMediType = (event: any) => {
    setFormData({
      ...formData,
      mediaType: event,
    });
  };

  return (
    <div
      className="search"
      data-testid="search"
    >
      <Select
        id="mediaType"
        label="Select media type"
        value={formData.mediaType}
        onChange={handleMediType}
        options={[
          { value: "multi", label: "All" },
          { value: "tv", label: "TV" },
          { value: "movie", label: "Film" },
          { value: "person", label: "Actor" },
        ]}
        placeholder="Select..."
        searchable={false}
        defaultValue={"multi"}
        isDisabled={isSelectDisabled}
      />
      <div className="search__options">
        <form
          className="search__form"
          onChange={(e) => {
            handleSuggestions(e);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
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
            value={formData.searchTerm || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                searchTerm: e.target.value,
              });
            }}
          />
        </form>
        {!!formData.searchTerm && (
          <Button
            variant="icon"
            className="search__form-clear"
            type="reset"
            onClick={clear}
          >
            <ClearIcon />
          </Button>
        )}
        <Fade in={!!suggestions.length && !!formData.searchTerm}>
          <div>
            {!!suggestions.length && (
              <ul className="search__options-list">
                {suggestions.map((suggestion: any, index: number) => {
                  const mediaType = formData.mediaType.value === "multi" ? suggestion["media_type"] : formData.mediaType.value;

                  return (
                    <li
                      className="search__options-list-item"
                      key={index}
                    >
                      <Button
                        href={`/details/${mediaType}/${suggestion["id"]}`}
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
                          {mediaType === "tv" ? <TvIcon /> : mediaType === "movie" ? <TheatersIcon /> : <PersonIcon />}
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
    </div>
  );
};

export default Search;
