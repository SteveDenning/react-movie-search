import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import moment from "moment";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import ClearIcon from "@mui/icons-material/Clear";
import { Fade } from "@mui/material";
import Image from "../../components/image";

// Styles
import "./search.scss";

interface Props {
  onSubmit: (data: any) => void;
  setValue?: (boolean: any) => void;
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
      getAllMedia(value.target.value)
        .then((response: any) => {
          const uniqueResults = response.data.results.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item["original_title"] === current["original_title"])) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);

          setSuggestions(uniqueResults.slice(0, 10));
          setShowOptions(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowOptions(false);
      handleSearchInput("");
      onSubmit("");
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
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="search__form-input"
          type="text"
          placeholder="Search..."
        />
        <Button
          variant="icon"
          type="reset"
        >
          <ClearIcon sx={{ color: "#ccc", fontSize: 30 }} />
        </Button>
      </form>
      <Fade in={!!suggestions.length && showOptions}>
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
                      setShowOptions(false);
                      handleSearchInput(suggestion["original_title"]);
                      onSubmit(suggestion["original_title"]);
                    }}
                  >
                    <Image
                      resource={suggestion}
                      size="xsmall"
                    />
                    <div>
                      <p>{suggestion["original_title"]}</p>
                      <p className="search__options-list-item-year">{moment(suggestion["release_date"]).format("YYYY")}</p>
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
