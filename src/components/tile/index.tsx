import React, { useState } from "react";

// Utils
import useDefineMediaType from "../../utils/use-define-media-type";

// Components
import Button from "../button";
import Image from "../image";
import Modal from "../modal";
import Overview from "../overview";

// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

// Styles
import "./tile.scss";

interface Props {
  resource: any;
  handleDelete: (id: string) => void;
}

const Tile: React.FC<Props> = ({ resource, handleDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const text = resource?.overview;
  const mediaType = useDefineMediaType(resource);

  return (
    <div
      className="tile"
      data-testid="tile"
    >
      <Button
        className="tile__image"
        onClick={() => (window.location.href = `/details/${mediaType}/${resource.id}`)}
        variant="plain"
      >
        <Image
          id={resource.id}
          resource={resource}
        />
      </Button>
      <div className="tile__content">
        <h2>{resource.title || resource.name}</h2>
        {text && (
          <Overview
            resource={resource}
            text={text}
          />
        )}
        <p>Popularity vote: {resource?.vote_average?.toFixed(1)}</p>
      </div>
      <div className="tile__actions">
        <Button
          variant="icon"
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon />
        </Button>
      </div>

      <Modal
        id={resource.id}
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        variant={["small"]}
      >
        <h3 style={{ textAlign: "center" }}>
          Are you sure you want to remove <br />
          {resource.title || resource.name}?
        </h3>

        <div className="modal__action-buttons">
          <Button
            testId="cancel-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(resource.id);
              setIsOpen(false);
            }}
            color="red"
            testId="delete-button"
          >
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Tile;
