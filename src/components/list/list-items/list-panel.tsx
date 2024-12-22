import React, { useState } from "react";

// Components
import Button from "../../button";
import Image from "../../image";
import Modal from "../../modal";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  item: any;
  handleDelete?: (id: string) => void;
}

const ListPanel: React.FC<Props> = ({ item, handleDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="list__item-image">
        <Image
          id={item.id}
          resource={item}
          link
        />
      </div>
      <div className="list__item-content">
        <h2>{item.title || item.name}</h2>
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
      <div className="list__item-actions">
        <Button
          variant="icon"
          onClick={() => handleDelete(item.id)}
        >
          <DeleteIcon />
        </Button>
      </div>
    </>
  );
};

export default ListPanel;
