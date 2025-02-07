import React from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import "./section-heading.scss";

interface Props {
  heading: string;
  buttonLink?: string;
  buttonText?: string;
  children?: React.ReactNode;
}

const SectionHeading: React.FC<Props> = ({ heading, buttonLink, buttonText, children }) => {
  return (
    <div
      className="section-heading"
      data-testid="section-heading"
    >
      <h2 className="section-heading__header text-glow">{heading}</h2>
      {buttonText && (
        <Button
          onClick={() => (window.location.href = buttonLink)}
          variant="heading"
        >
          <span className="text-glow">{buttonText}</span>
          <ArrowForwardIosIcon />
        </Button>
      )}
      {children}
    </div>
  );
};

export default SectionHeading;
