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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

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
                onClick={() => setIsModalOpen(true)}
                variant="link"
              >
                More
              </Button>
            </p>

            <Modal
              id={item.id}
              open={isModalOpen}
              handleClose={() => {
                setIsModalOpen(false);
              }}
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
          onClick={() => setIsRemoveModalOpen(true)}
        >
          <DeleteIcon />
        </Button>
      </div>

      <Modal
        id={`${item.id}-${item.title || item.name}`}
        open={isRemoveModalOpen}
        handleClose={() => {
          setIsRemoveModalOpen(false);
        }}
        variant={["small"]}
      >
        <h3>Remove {item.title || item.name} from your favourites?</h3>

        <div className="modal__action-buttons">
          <Button
            onClick={() => {
              setIsRemoveModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(item.id)}
            color="red"
          >
            Remove
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ListPanel;
