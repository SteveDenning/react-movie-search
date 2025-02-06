import React from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./section-heading.scss";

interface Props {
  text: string;
  buttonLink?: string;
  buttonText?: string;
  onClick?: () => void;
}

const SectionHeading: React.FC<Props> = ({ text, buttonLink, buttonText, onClick }) => {
  return (
    <div
      className="section-heading"
      data-testid="section-heading"
    >
      <h2 className="section-heading__header text-glow">{text}</h2>
      {buttonText && (
        <Button
          onClick={() => (buttonLink ? (window.location.href = buttonLink) : onClick())}
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
