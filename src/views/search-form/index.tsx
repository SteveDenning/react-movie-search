import React, { useCallback } from "react";
import { debounce } from "lodash";

// Styles
import "./search-form.scss";

interface Props {
  onSubmit: (data: any) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  const handleSearchInput = (value: any) => {
    debouncedSearch(value.target.value);
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

  return (
    <form
      onChange={(e) => {
        handleSearchInput(e);
      }}
      className="search-form"
    >
      <input
        type="text"
        placeholder="Search"
      />
    </form>
  );
};

export default SearchForm;
