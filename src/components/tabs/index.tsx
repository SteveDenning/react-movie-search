import React, { useEffect, useState } from "react";

// Components
import Button from "../button";

// Styles
import "./tabs.scss";

interface Props {
  variant?: string;
  className?: string;
  tabs: any[];
  onClick: (tab: { label: string; value: string; payload: any }) => any;
  initialSelection?: string;
}

const Tabs: React.FC<Props> = ({ variant, className, tabs, onClick, initialSelection }) => {
  const [selected, setSelected] = useState(initialSelection || tabs[0].value);

  const baseClass = "tabs";
  const variantClass = variant ? `tabs--${variant}` : "";
  const classes = [baseClass, variantClass, className].filter(Boolean).join(" ");

  const handleClick = (event: any, tab: { label: string; value: string; payload: any }) => {
    event.preventDefault();
    setSelected(tab.value);
    onClick(tab);
  };

  const handleInitialSelectionChange = () => {
    if (initialSelection) {
      setSelected(initialSelection);
    }
  };

  useEffect(() => {
    handleInitialSelectionChange();
  }, [initialSelection]);

  return (
    <section
      className={classes}
      data-testid="tabs"
      aria-label="Tabs"
    >
      {tabs.map((tab: { label: string; value: string; payload: any }, index: number) => {
        const isSelected = selected === tab.value;

        return (
          <Button
            className={`tabs__button${isSelected ? " tabs__button--selected" : ""}`}
            onClick={(event) => handleClick(event, tab)}
            key={index}
            variant="plain"
          >
            {tab.label}

            <span className="sr-only">{isSelected ? "selected" : "unselected"}</span>
          </Button>
        );
      })}
      <div className="glider"></div>
    </section>
  );
};

export default Tabs;
