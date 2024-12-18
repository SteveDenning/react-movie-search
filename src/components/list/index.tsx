import React from "react";

// Styles
import "./list.scss";

interface Props {
  items: any[];
}

const List: React.FC<Props> = ({ items }) => {
  return (
    <ul
      className="list"
      data-testid="list"
    >
      {items.map((item) => {
        return <li key={item.id}>{item.name || item.title}</li>;
      })}
    </ul>
  );
};

export default List;
