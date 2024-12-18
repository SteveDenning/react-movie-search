import React, { useState } from "react";

// Styles
import "./list.scss";

// Components
import Button from "../../components/button";
import Image from "../../components/image";
import Modal from "../../components/modal";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  items: any[];
  handleDelete?: (id: string) => void;
}

const List: React.FC<Props> = ({ items, handleDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

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
                  link
                />
              </div>
              <div className="panel__content">
                <h3>{item.title || item.name}</h3>
                {item?.overview.length > 400 ? (
                  <>
                    <p>
                      {item.overview.slice(0, 400)}.....{" "}
                      <Button
                        onClick={() => setIsOpen(true)}
                        variant="link"
                      >
                        More
                      </Button>
                    </p>

                    <Modal
                      id={item.id}
                      open={isOpen}
                      handleClose={handleClose}
                    >
                      <h3>{item.title || item.name}</h3>
                      <p>{item.overview}</p>
                    </Modal>
                  </>
                ) : (
                  <>
                    <p>{item.overview}</p>
                  </>
                )}
                <p>Popularity vote: {item.vote_average.toFixed(1)}</p>
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
