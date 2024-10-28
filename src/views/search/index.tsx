import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

// Utils
import { getAllMedia } from "../../utils/services";

// Components
import { Fade } from "@mui/material";

// Styles
import "./search.scss";

interface Props {
  onSubmit: (data: any) => void;
  setValue: (boolean: any) => void;
}

const Search: React.FC<Props> = ({ onSubmit, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSearchInput = (value: string) => {
    debouncedSearch(value);
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 2 || !value) {
        onSubmit(value);
      }
    }, 750),
    [],
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleSuggestions = (value: any) => {
    if (value.target.value.length > 2) {
      setValue(!!value.target.value.length);
      getAllMedia(value.target.value)
        .then((response: any) => {
          const suggestions = response.data.results.map((title: any) => title["original_title"]);

          setSuggestions(suggestions);
          setShowOptions(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setValue(false);
      setSuggestions([]);
    }
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
          placeholder="Search"
        />
      </form>
      <Fade in={showOptions}>
        <ul className="search__options-list">
          {suggestions.map((suggestion: any, index: number) => {
            return (
              <li
                tabIndex={1}
                className="search__options-list-item"
                key={index}
                onClick={() => {
                  setShowOptions(false);
                  handleSearchInput(suggestion);
                  onSubmit(suggestion);
                }}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      </Fade>
    </div>
  );
};

export default Search;
