import React, { useState } from "react";

// Components
import Button from "../../button";
import Image from "../../image";
import Modal from "../../modal";
import Overview from "../../overview";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  item: any;
  handleDelete?: (id: string) => void;
}

const ListPanel: React.FC<Props> = ({ item, handleDelete }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const text = item?.overview;

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
        <Overview
          resource={item}
          text={text}
        />
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
        id={item.id}
        open={isRemoveModalOpen}
        handleClose={() => {
          setIsRemoveModalOpen(false);
        }}
        variant={["small"]}
      >
        <h3>Are you sure you want to remove {item.title || item.name}?</h3>

        <div className="modal__action-buttons">
          <Button
            onClick={() => {
              setIsRemoveModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(item.id);
              setIsRemoveModalOpen(false);
            }}
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
