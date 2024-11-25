import React from "react";
import Select from "react-select";

// Styles
import "./select.scss";

interface Props {
  id: string;
  onChange: (e: any) => void;
  options: any[];
  value: any;
  label?: string;
  className?: string;
  placeholder?: string;
  searchable?: boolean;
  defaultValue?: any;
  labeled?: boolean;
}

const SelectComponent: React.FC<Props> = ({ onChange, label, id, value, options, placeholder, searchable, defaultValue, labeled }) => {
  const handleSelectChange = (selection) => {
    onChange(selection);
  };

  return (
    <div
      className="select"
      data-testid="select"
    >
      <label
        className={`select__label ${!labeled ? "sr-only" : ""}`}
        htmlFor={id}
        data-testid="select-label"
      >
        {label}
      </label>
      <Select
        inputId={id}
        classNamePrefix="select"
        value={value || ""}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder}
        isSearchable={searchable}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SelectComponent;