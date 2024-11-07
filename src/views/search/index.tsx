import React, { useState } from "react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Components
import Button from "../../components/button";
import ClearIcon from "@mui/icons-material/Clear";
import { Fade } from "@mui/material";
import Image from "../../components/image";

// Styles
import "./search.scss";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const updateQuery = (key, value) => {
    params.set(key, value);
    setSearchParams(params);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateQuery("query", event.target[0].value);
    setShowOptions(false);
  };

  const handleSuggestions = (event: any) => {
    if (event.target.value.length > 2) {
      getAllMedia(event.target.value)
        .then((response: any) => {
          const uniqueResults = response.data.results.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item["original_title"] === current["original_title"])) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);

          setSuggestions(response.data.results.slice(0, 10));
          setShowOptions(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const clear = () => {
    window.location.href = "/"; // Find a better way to reset this without reloading the page
    setSuggestions([]);
    setShowOptions(false);
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
          placeholder="Search..."
        />
      </form>
      <Button
        variant="icon"
        type="reset"
        onClick={clear}
      >
        <ClearIcon sx={{ color: "#ccc", fontSize: 20 }} />
      </Button>
      <Fade in={!!suggestions.length && showOptions}>
        <div>
          {!!suggestions.length && (
            <ul className="search__options-list">
              {suggestions.map((suggestion: any, index: number) => {
                {
                  console.log(suggestion);
                }
                return (
                  <li
                    tabIndex={1}
                    className="search__options-list-item"
                    key={index}
                    onClick={() => {
                      window.location.href = `/details/${suggestion["media_type"]}/${suggestion["id"]}`;
                    }}
                  >
                    <Image
                      resource={suggestion}
                      size="xsmall"
                    />
                    <div>
                      <p>{suggestion["original_title"] || suggestion["name"]}</p>
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
