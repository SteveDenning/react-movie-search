import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import pluralize from "pluralize";

// Utils
import useScreenSize from "../../utils/use-screen-size";

// Services
import { getAllMediaFromSearch } from "../../services/search";

// Config
import { config } from "../../config/routes";

// MUI
import { Fade } from "@mui/material";

// MUI Icons
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Button from "../../components/button";
import Select from "../../components/select";
import TopResults from "../../components/suggestions";
import VoiceInput from "../../components/voice-input";

// Styles
import "./search.scss";

interface Props {
  handleSearchState: (boolean) => void;
}

const Search: React.FC<Props> = ({ handleSearchState }) => {
  const [mediaType, setMediaType] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVoiceInput, setIsVoiceInput] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(params.get("query"));
  const type = pluralize.singular(params.get("filterByType") || "multi");
  const isSearchResultsPage = window.location.pathname === config.searchResults.path;

  const screenSize = useScreenSize();
  const isTablet = screenSize.width <= 1024;
  const isMobile = screenSize.width <= 768;
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const isDisabled = !!suggestions.length && !!searchTerm?.length;

  // Class Definitions
  const baseClass = "search";
  const mobileClass = isMobile ? "search--mobile" : "";
  const openClass = isOpen ? "search--open" : "";
  const classes = [baseClass, mobileClass, openClass].filter(Boolean).join(" ");

  const options = [
    { value: "multi", label: "All" },
    { value: "tv", label: "TV" },
    { value: "movie", label: "Film" },
    { value: "person", label: "People" },
  ];

  const updateQuery = (key: string, value: string) => {
    params.set(key, value);
    setSearchParams(params);
  };

  const handleSubmit = () => {
    if (searchTerm) {
      updateQuery("query", searchTerm);
      updateQuery("filterByType", mediaType.value);
      setSuggestions([]);
      navigate(
        {
          pathname: `${config.searchResults.path}`,
          search: `?query=${encodeURIComponent(searchTerm)}&filterByType=${mediaType.value}&page=1`,
        },
        { replace: !isSearchResultsPage },
      );
    }
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      getAllMediaFromSearch(`${mediaType.value}?query=${event.target.value}`)
        .then((response: any) => {
          const suggestions = response.data.results?.slice(0, 10);
          setSuggestions(suggestions);
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
    removeQueryParam("filterByType");
    updateQuery("page", "1");
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
      updateQuery("page", "1");
      updateQuery("filterByType", event.value);
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

  const handleShowSearch = (state: boolean) => {
    setIsOpen(state);
    handleSearchState(state);
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
      className={classes}
      data-testid="search"
    >
      <Button
        className="search__icon"
        variant="icon"
        onClick={() => handleShowSearch(true)}
      >
        <SearchIcon />
      </Button>
      <div className="search__container">
        <Select
          id="mediaType"
          label="Select media type"
          value={mediaType}
          onChange={handleMediaTypeChange}
          options={options}
          placeholder="All"
          searchable={false}
          defaultValue="multi"
          isDisabled={isDisabled}
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
              tabIndex={-1}
            >
              Submit
            </Button>
            {(!!searchTerm?.length || isMobile) && (
              <Button
                testId="search-form-clear"
                variant="icon"
                className="search__form-clear"
                type="reset"
                onClick={() => {
                  clear();
                  handleShowSearch(false);
                }}
              >
                <span className="sr-only">Reset</span>
                <ClearIcon />
              </Button>
            )}
            {!searchTerm?.length && <VoiceInput setValue={updateSearchTerm} />}
          </form>
          <Fade in={!!searchTerm?.length}>
            <div>
              {!!suggestions.length && (
                <TopResults
                  type={mediaType.value}
                  options={suggestions}
                />
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Search;
