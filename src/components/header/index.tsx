import React from "react";

// Components

// Styles
import "./header.scss";

interface Props {
  divider?: boolean;
  straight?: boolean;
}

const Header: React.FC<Props> = ({ divider, straight }) => {
  const baseClass = "header";
  const dividerClass = divider ? "header--divider" : "";
  const straightClass = straight ? "header--straight" : "";
  const classes = [baseClass, dividerClass, straightClass].filter(Boolean).join(" ");

  return (
    <header
      className={classes}
      data-testid="header"
    >
      <h1>React Movie Search</h1>
    </header>
  );
};

export default Header;
