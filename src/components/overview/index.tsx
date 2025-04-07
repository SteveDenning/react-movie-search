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

  // Class definitions
  const baseClass = "overview";
  const copyClass = copyText ? "copy" : "";
  const classes = [baseClass, copyClass].filter(Boolean).join(" ");

  return (
    <div
      data-testid="overview"
      className="overview"
    >
      {text.length > limit ? (
        <>
          <p
            className={classes}
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
          className={classes}
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      )}
    </div>
  );
};

export default Overview;
