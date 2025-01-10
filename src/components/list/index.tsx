import React from "react";

// Styles
import "./list.scss";

// Components
import Button from "../../components/button";
import Panel from "./list-items/list-panel";

interface Props {
  items: any[];
  onClick?: (id?: string) => void;
  variant?: "list-panel" | "link" | undefined;
}

const List: React.FC<Props> = ({ items, onClick, variant }) => {
  // Class Definitions
  const baseClass = "list";
  const variantClass = variant ? `list--${variant}` : "";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <ul
      className={classes}
      data-testid="list"
    >
      {items.map((item, index: number) => {
        return (
          <li
            key={index}
            className="list__item"
            data-testid="list-item"
          >
            {variant === "list-panel" ? (
              <Panel
                item={item}
                handleDelete={onClick}
              />
            ) : variant === "link" ? (
              <Button
                variant="link"
                className="button--icon-button"
                onClick={() => (window.location.href = item.path)}
              >
                {item.icon && item.icon}
                {item.label}
              </Button>
            ) : (
              <span className="list__content">{item.label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
