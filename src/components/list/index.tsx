import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import "./list.scss";

// Config
import { config } from "../../config/routes";

// Components
import Panel from "./list-items/list-panel";
import Button from "../../components/button";

interface Props {
  items: any[];
  handleDelete?: (id: string) => void;
  variant?: "list-panel" | "link" | undefined;
  children?: React.ReactNode;
}

const List: React.FC<Props> = ({ items, handleDelete, variant, children }) => {
  const navigate = useNavigate();
  return (
    <ul
      className="list"
      data-testid="list"
    >
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className="list__item"
            data-testid="list-item"
          >
            {variant === "list-panel" ? (
              <Panel
                item={item}
                handleDelete={handleDelete}
              />
            ) : variant === "link" ? (
              <Button
                variant="link"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ) : (
              children
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
