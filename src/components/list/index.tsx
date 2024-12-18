import React from "react";

// Styles
import "./list.scss";

// Components
import Button from "../../components/button";
import Image from "../../components/image";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  items: any[];
  handleDelete?: (id: string) => void;
}

const List: React.FC<Props> = ({ items, handleDelete }) => {
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
          >
            <div className="panel">
              <div className="panel__image">
                <Image
                  id={item.id}
                  resource={item}
                  size="small"
                  link
                />
              </div>
              <div className="panel__content">
                <h3>{item.title || item.name}</h3>
                <p>{item.overview}</p>
                <p>{item.vote_average.toFixed(1)}</p>
              </div>
              <div className="panel__actions">
                <Button
                  variant="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
