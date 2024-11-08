import React from "react";

// Views
import Search from "./../search";

// Styles
import "./header.scss";

interface Props {
  heading: string;
  hasSearch?: boolean;
}

const Header: React.FC<Props> = ({ heading, hasSearch }) => {
  return (
    <header
      className="header"
      data-testid="header"
    >
      <h1 className={hasSearch ? "sr-only" : ""}>{heading}</h1>
      {hasSearch && <Search />}
    </header>
  );
};

export default Header;
