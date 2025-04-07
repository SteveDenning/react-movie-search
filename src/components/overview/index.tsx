import React, { useState } from "react";

// Components
import Button from "../button";
import Modal from "../modal";

// Styles
import "./overview.scss";

interface Props {
  resource?: any;
  text: string;
  limit?: number;
  copyText?: boolean;
}

const Overview: React.FC<Props> = ({ resource, text, limit = 400, copyText }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ellipsisText = text.slice(0, limit) + "&nbsp&nbsp";

  return (
    <div
      data-testid="overview"
      className="overview"
    >
      {text.length > limit ? (
        <>
          <p
            className={copyText ? "copy" : ""}
            dangerouslySetInnerHTML={{ __html: ellipsisText }} // TODO - find a safer way to avoid XSS attacks
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="link"
          >
            More
          </Button>
          <Modal
            id={resource.id}
            open={isModalOpen}
            handleClose={() => {
              setIsModalOpen(false);
            }}
            title={resource.title || resource.name || resource.author}
          >
            <p dangerouslySetInnerHTML={{ __html: text }} /> {/* TODO - find a safer way to avoid XSS attacks */}
          </Modal>
        </>
      ) : (
        <p
          className={copyText ? "copy" : ""}
          dangerouslySetInnerHTML={{ __html: text }} // TODO - find a safer way to avoid XSS attacks
        />
      )}
    </div>
  );
};

export default Overview;
