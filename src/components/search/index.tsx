import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import pluralize from "pluralize";

// Utils
import { getAllMediaFromSearch } from "../../utils/get-resources";
import useScreenSize from "../../utils/use-screen-size";

// Config
import { config } from "../../config/routes";

// Components
import Button from "../../components/button";
import Select from "../../components/select";
import TopResults from "../../components/suggestions";
import VoiceInput from "../../components/voice-input";

// MUI
import { Fade } from "@mui/material";

// MUI Icons
import ClearIcon from "@mui/icons-material/Clear";

// Styles
import "./search.scss";

const Search = () => {
  const [mediaType, setMediaType] = useState(null);
  const [isVoiceInput, setIsVoiceInput] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(params.get("query"));
  const type = pluralize.singular(params.get("type") || "multi");
  const isSearchResultsPage = window.location.pathname === config.searchResults.path;

  const screenSize = useScreenSize();
  const isTablet = screenSize.width <= 1024;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const options = [
    { value: "multi", label: "All" },
    { value: "tv", label: "TV" },
    { value: "movie", label: "Film" },
    { value: "person", label: "Actor" },
  ];

  const updateQuery = (key: string, value: string) => {
    params.set(key, value);
    setSearchParams(params);
  };

  const handleSubmit = () => {
    if (searchTerm?.length) {
      updateQuery("query", searchTerm);
      updateQuery("type", type);
      setSuggestions([]);
      navigate(
        {
          pathname: `${config.searchResults.path}`,
          search: `?query=${searchTerm}&type=${type}`,
        },
        { replace: !isSearchResultsPage },
      );
    }
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      getAllMediaFromSearch(`${type}?query=${event.target.value}`)
        .then((response: any) => {
          setSuggestions(response.data.results.slice(0, 10));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const clear = () => {
    setSearchTerm(null);
    setSuggestions([]);
    setSearchParams({});
    removeQueryParam("query");
    removeQueryParam("type");
    inputRef.current.focus();
  };

  const removeQueryParam = (key: string) => {
    params.delete(key);

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const handleMediaTypeChange = (event: any) => {
    setMediaType(event);
    if (isSearchResultsPage) {
      updateQuery("type", event.value);
    }
  };

  const handleSetMedia = (value: string) => {
    if (type) {
      return options.find((option) => option.value === value);
    }
  };

  const updateSearchTerm = (value: string) => {
    setIsVoiceInput(true);
    if (!isTablet) {
      inputRef.current.focus();
    }
    setSearchTerm(value);
  };

  useEffect(() => {
    if (searchTerm && isVoiceInput) {
      handleSubmit();
      setIsVoiceInput(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    setMediaType(handleSetMedia(type));
  }, [type]);

  return (
    <div
      className="search"
      data-testid="search"
    >
      <Select
        id="mediaType"
        label="Select media type"
        value={mediaType}
        onChange={handleMediaTypeChange}
        options={options}
        placeholder="All"
        searchable={false}
        defaultValue={"multi"}
        isDisabled={!!suggestions.length && !!searchTerm?.length}
      />
      <div className="search__options">
        <form
          data-testid="search-form"
          autoComplete="off"
          className="search__form"
        >
          <label
            data-testid="search-form-label"
            htmlFor="search"
            aria-labelledby="search"
            className="sr-only"
          >
            Search for media
          </label>
          <input
            id="search"
            data-testid="search-form-input"
            className="search__form-input"
            type="text"
            placeholder="Search"
            value={searchTerm || ""}
            onChange={(e) => {
              handleSuggestions(e);
              setSearchTerm(e.currentTarget.value);
            }}
            ref={inputRef}
          />
          <Button
            className="sr-only"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {!!searchTerm?.length && (
            <Button
              data-testid="search-form-clear"
              variant="icon"
              className="search__form-clear"
              type="reset"
              onClick={clear}
            >
              <span className="sr-only">Reset</span>
              <ClearIcon />
            </Button>
          )}
        </form>
        <VoiceInput setValue={updateSearchTerm} />
        <Fade in={!!searchTerm?.length}>
          <div>
            {!!suggestions.length && (
              <TopResults
                type={type}
                options={suggestions}
              />
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Search;
