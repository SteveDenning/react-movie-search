import React, { useState } from "react";

// Components
import Button from "../../components/button";
import Modal from "../../components/modal";

interface Props {
  resource?: any;
  text: string;
  limit?: number;
}

const Overview: React.FC<Props> = ({ resource, text, limit = 400 }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ellipsisText = text.slice(0, limit);

  return (
    <div data-testid="overview">
      {text.length > limit ? (
        <>
          <p>
            {ellipsisText}.....
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="link"
            >
              More
            </Button>
          </p>

          <Modal
            id={resource.id}
            open={isModalOpen}
            handleClose={() => {
              setIsModalOpen(false);
            }}
          >
            <h3>{resource.title || resource.name}</h3>
            <p>{text}</p>
          </Modal>
        </>
      ) : (
        <>
          <p>{text}</p>
        </>
      )}
    </div>
  );
};

export default Overview;
