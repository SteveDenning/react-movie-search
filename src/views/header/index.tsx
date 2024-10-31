import React from "react";

// Styles
import "./header.scss";

interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return (
    <header
      className="header"
      data-testid="header"
    >
      <h1>{heading}</h1>
    </header>
  );
};

export default Header;
