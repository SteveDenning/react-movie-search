import React, { useCallback, useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

// Styles
import "./search-form.scss";
import { getAllMedia } from "../../utils/services";
import { Fade } from "@mui/material";

interface Props {
  onSubmit: (data: any) => void;
  setValue: (boolean: any) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const searchInput = useRef(null);

  if (!document.activeElement === searchInput.current) {
    // console.log("Element has focus");
  }

  const handleSearchInput = (value: string) => {
    debouncedSearch(value);
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 2 || !value) {
        console.log(value);
        onSubmit(value);
      }
    }, 750),
    [],
  );

  const handleSearchByKeyword = (event: any) => {
    onSubmit(event.target.value);
  };

  const handleSuggestions = (value: any) => {
    console.log(value.target.value);
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
