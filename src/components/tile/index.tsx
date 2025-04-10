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
  handleDelete?: (id: string) => void;
  hasImage?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Tile: React.FC<Props> = ({ resource, handleDelete, hasImage = true, onClick, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const text = resource?.overview || resource?.description;
  const mediaType = useDefineMediaType(resource);

  const handleOnClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      window.location.href = `/details/${mediaType}/${resource.id}`;
    }
  };

  const renderImage = () => {
    if (resource) {
      return (
        <Image
          resource={resource}
          onClick={() => setIsOpenModal(true)}
        />
      );
    }
  };

  return (
    <div
      className="tile"
      data-testid="tile"
    >
      {hasImage && <div className="tile__image">{renderImage()}</div>}
      <div className="tile__content">
        <div className="tile__header">
          <Button
            href="#"
            onClick={handleOnClick}
          >
            <h3 className="tile__title">{resource.title || resource.name}</h3>
          </Button>
        </div>
        {text && (
          <Overview
            resource={resource}
            text={text}
          />
        )}
        {resource?.vote_average && <p className="copy">Popularity vote: {resource.vote_average.toFixed(1)}</p>}
      </div>

      {handleDelete && (
        <div className="tile__actions">
          <Button
            variant="icon"
            onClick={() => setIsOpen(true)}
          >
            <DeleteIcon />
          </Button>
          {children}
        </div>
      )}

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
      <Modal
        id={resource.id}
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        variant={["image"]}
      >
        {renderImage()}
      </Modal>
    </div>
  );
};

export default Tile;
