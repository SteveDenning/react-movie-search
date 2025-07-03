import React from "react";

// Styles
import "./toggle-switch.scss";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<Props> = ({ checked, onChange, disabled }) => {
  // class definitions
  const baseClass = "toggle-switch";
  const disabledClass = disabled ? "toggle-switch--disabled" : "";
  const classes = [baseClass, disabledClass].filter(Boolean).join(" ");

  return (
    <label
      className={classes}
      data-testid="toggle-switch"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-switch__slider" />
    </label>
  );
};

export default ToggleSwitch;
