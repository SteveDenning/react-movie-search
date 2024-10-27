import React, { useCallback, useState, useRef } from "react";
import { debounce } from "lodash";

// Utils
import { getAllMedia } from "../../utils/services";

// Components
import { Fade } from "@mui/material";

// Styles
import "./search-form.scss";

interface Props {
  onSubmit: (data: any) => void;
  setValue: (boolean: any) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const searchInput = useRef(null);

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

  const handleSearchByKeyword = (event: any) => {
    onSubmit(event.target.value);
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
    <>
      <form
        onChange={(e) => {
          handleSuggestions(e);
        }}
        className="search-form"
        onSubmit={handleSearchByKeyword}
      >
        <input
          type="text"
          placeholder="Search"
          ref={searchInput}
        />
      </form>
      <Fade in={!!suggestions.length && showOptions}>
        <div className="search-form__options">
          <ul>
            {suggestions.map((suggestion: any, index: number) => {
              return (
                <li
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
        </div>
      </Fade>
    </>
  );
};

export default SearchForm;
