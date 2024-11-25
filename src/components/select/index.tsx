import React from "react";
import Select from "react-select";

// Styles
import "./select.scss";

interface Props {
  className?: string;
  id: string;
  label?: string;
  onChange: (e: any) => void;
  options: any[];
  value: any;
}

const SelectComponent: React.FC<Props> = ({ onChange, label, id, value, options }) => {
  const handleSelectChange = (selection) => {
    onChange(selection);
  };

  return (
    <div
      className="select"
      data-testid="select"
    >
      <label
        className="select__label"
        htmlFor={id}
        data-testid="select-label"
      >
        {label}
      </label>
      <Select
        classNamePrefix="select"
        value={value || ""}
        onChange={handleSelectChange}
        options={options}
      />
    </div>
  );
};

export default SelectComponent;
