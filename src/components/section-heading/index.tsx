import React from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./section-heading.scss";

interface Props {
  text: string;
  mediaType?: string;
  buttonText?: string;
}

const SectionHeading: React.FC<Props> = ({ text, mediaType, buttonText }) => {
  return (
    <div
      className="section-heading"
      data-testid="section-heading"
    >
      <h2 className="section-heading__header text-glow">{text}</h2>
      {buttonText && (
        <Button
          onClick={() => (window.location.href = `/media-listing/${mediaType}?page=1`)}
          variant="heading"
        >
          <span className="text-glow">{buttonText}</span>
          <ArrowForwardIosIcon />
        </Button>
      )}
    </div>
  );
};

export default SectionHeading;
