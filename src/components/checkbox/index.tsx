import React from "react";

// Styles
import "./checkbox.scss";

interface Props {
  variant?: string;
  label: any;
  id: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: any) => void;
  checked: boolean;
  noLabel?: boolean;
  className?: string;
  testId?: string;
}

const Checkbox: React.FC<Props> = ({ variant, id, name, disabled, required, label, onChange, checked, noLabel, className, testId }) => {
  // Class definitions
  const baseClass = "checkbox";
  const variantClass = variant ? `checkbox--${variant}` : "";
  const checkedClass = checked ? "checkbox--checked" : "";
  const classes = [baseClass, variantClass, className, checkedClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid={testId || "checkbox"}
    >
      <input
        className="checkbox__input"
        id={id}
        name={name}
        type="checkbox"
        disabled={disabled}
        aria-disabled={disabled}
        required={required}
        aria-required={required}
        checked={checked}
        aria-checked={checked}
        onChange={onChange}
        aria-label={noLabel ? label : undefined}
        data-testid="checkbox-input"
      />

      <label
        className="checkbox__label"
        htmlFor={id}
        data-testid="checkbox-label"
      >
        <span className={noLabel ? "sr-only" : undefined}>{label}</span>

        {required && (
          <>
            <span className="checkbox__required"> *</span>
            <span className="sr-only"> Required</span>
          </>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
