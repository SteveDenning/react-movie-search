import React, { useState } from "react";

// Utils
import useDefineMediaType from "../../../utils/use-define-media-type";

// Components
import Button from "../../button";
import Image from "../../image";
import Modal from "../../modal";
import Overview from "../../overview";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  item: any;
  handleDelete: (id: string) => void;
}

const ListPanel: React.FC<Props> = ({ item, handleDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const text = item?.overview;
  const mediaType = useDefineMediaType(item);

  return (
    <>
      <div className="list__item-image">
        <Image
          id={item.id}
          resource={item}
          onClick={() => window.location.replace(`/details/${mediaType}/${item.id}`)}
        />
      </div>
      <div className="list__item-content">
        <h2>{item.title || item.name}</h2>
        {text && (
          <Overview
            resource={item}
            text={text}
          />
        )}
        <p>Popularity vote: {item.vote_average.toFixed(1)}</p>
      </div>
      <div className="list__item-actions">
        <Button
          variant="icon"
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon />
        </Button>
      </div>

      <Modal
        id={item.id}
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        variant={["small"]}
      >
        <h3 style={{ textAlign: "center" }}>
          Are you sure you want to remove <br />
          {item.title || item.name}?
        </h3>

        <div className="modal__action-buttons">
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(item.id);
              setIsOpen(false);
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
