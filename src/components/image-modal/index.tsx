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

  const renderImage = (size) => {
    if (resource) {
      return (
        <Image
          id={resource.id}
          resource={resource}
          size={size}
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
      {renderImage("large")}
      <Modal
        id={resource.id}
        open={isOpen}
        handleClose={handleClose}
        variant={["image"]}
      >
        {renderImage("fill")}
      </Modal>
    </div>
  );
};

export default ImageModal;
