import React from "react";

// Views
import Search from "./../search";

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
      {heading ? <h1>{heading}</h1> : <Search />}
    </header>
  );
};

export default Header;
