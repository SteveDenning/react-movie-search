import React from "react";
import Select from "react-select";

// MUI Components
import makeAnimated from "react-select/animated";

// Styles
import "./select.scss";

interface Props {
  id: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  options: any[];
  value: any;
  label: string;
  className?: string;
  placeholder?: string;
  searchable?: boolean;
  defaultValue?: any;
  labeled?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  animated?: boolean;
}

const SelectComponent: React.FC<Props> = ({
  onChange,
  label,
  id,
  value,
  options,
  placeholder,
  searchable,
  defaultValue,
  labeled,
  isDisabled,
  isMulti,
  animated,
}) => {
  const handleSelectChange = (selection) => {
    onChange(selection);
  };

  const animatedComponents = makeAnimated();

  return (
    <div
      className="select"
      data-testid="select"
    >
      <label
        className={`select__label ${labeled ? "" : "sr-only"}`}
        htmlFor={id}
        data-testid="select-label"
      >
        {label}
      </label>
      <Select
        data-testid="select-element"
        inputId={id}
        classNamePrefix="select"
        value={value || ""}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder}
        isSearchable={searchable}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isMulti={isMulti}
        components={animated ? animatedComponents : undefined}
      />
    </div>
  );
};

export default SelectComponent;
