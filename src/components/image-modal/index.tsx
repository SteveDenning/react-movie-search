import React, { useState } from "react";

// Styles
import "./image-modal.scss";

// Components
import Image from "../../components/image";
import Modal from "../../components/modal";

interface Props {
  resource: any;
}

const ImageModal: React.FC<Props> = ({ resource }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderImage = () => {
    if (resource) {
      return (
        <Image
          id={resource.id}
          resource={resource}
          onClick={() => setIsOpen(true)}
        />
      );
    }
  };

  return (
    <div
      className="image-modal"
      data-testid="image-modal"
    >
      {renderImage()}
      <Modal
        id={resource.id}
        open={isOpen}
        handleClose={handleClose}
        variant={["image"]}
      >
        {renderImage()}
      </Modal>
    </div>
  );
};

export default ImageModal;
