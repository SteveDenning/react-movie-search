import React from "react";

// Styles
import "./header.scss";

interface Props {
  divider?: boolean;
  straight?: boolean;
  heading: string;
}

const Header: React.FC<Props> = ({ divider, straight, heading }) => {
  const baseClass = "header";
  const dividerClass = divider ? "header--divider" : "";
  const straightClass = straight ? "header--straight" : "";
  const classes = [baseClass, dividerClass, straightClass].filter(Boolean).join(" ");

  return (
    <header
      className={classes}
      data-testid="header"
    >
      <h1>{heading}</h1>
    </header>
  );
};

export default Header;
