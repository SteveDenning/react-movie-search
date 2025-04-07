import React, { useState } from "react";
import DOMPurify from "dompurify";

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
  const sanitizedText = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
  const ellipsisText = sanitizedText.slice(0, limit) + "....";

  return (
    <div
      data-testid="overview"
      className="overview"
    >
      {text.length > limit ? (
        <>
          <p
            className={copyText ? "copy" : ""}
            dangerouslySetInnerHTML={{ __html: ellipsisText }}
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
            <p dangerouslySetInnerHTML={{ __html: sanitizedText }} />
          </Modal>
        </>
      ) : (
        <p
          className={copyText ? "copy" : ""}
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      )}
    </div>
  );
};

export default Overview;
