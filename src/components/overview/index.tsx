import React, { useState } from "react";

// Components
import Button from "../button";
import Modal from "../modal";

interface Props {
  resource?: any;
  text: string;
  limit?: number;
  copyText?: boolean;
}

const Overview: React.FC<Props> = ({ resource, text, limit = 400, copyText }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ellipsisText = text.slice(0, limit);

  return (
    <div data-testid="overview">
      {text.length > limit ? (
        <>
          <p className={copyText ? "copy" : ""}>
            {ellipsisText}..... &nbsp;
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
            title={resource.title || resource.name || resource.author}
          >
            <p>{text}</p>
          </Modal>
        </>
      ) : (
        <>
          <p className={copyText ? "copy" : ""}>{text}</p>
        </>
      )}
    </div>
  );
};

export default Overview;
