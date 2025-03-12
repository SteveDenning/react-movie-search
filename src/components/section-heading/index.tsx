import React from "react";

// Components
import Button from "../../components/button";

// MUI Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Styles
import "./section-heading.scss";

interface Props {
  heading: string;
  buttonLink?: string;
  buttonText?: string;
  backButton?: boolean;
  variant?: "no-background";
}

const SectionHeading: React.FC<Props> = ({ heading, buttonLink, buttonText, backButton, variant }) => {
  const variantClass = `section-heading--${variant}`;
  const baseClass = "section-heading";
  const classes = [baseClass, variantClass].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-testid="section-heading"
    >
      <h2 className="section-heading__header text-glow">{heading}</h2>
      {buttonText && (
        <Button
          onClick={() => (window.location.href = buttonLink)}
          variant="link"
          endIcon={<ChevronRightIcon />}
        >
          <span className="text-glow">{buttonText}</span>
        </Button>
      )}
      {backButton && <Button onClick={() => window.history.back()}>Back</Button>}
    </div>
  );
};

export default SectionHeading;
