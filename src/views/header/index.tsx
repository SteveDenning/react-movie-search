import React from "react";

// Views
import Search from "./../search";

// Components
import Button from "../../components/button";

// MUI
import { Container, Typography } from "@mui/material";

// Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import TheatersIcon from "@mui/icons-material/Theaters";

// Styles
import "./header.scss";

interface Props {
  heading: string;
  hasSearch?: boolean;
}

const Header: React.FC<Props> = ({ heading, hasSearch }) => {
  return (
    <header>
      <Container>
        <div
          className="header"
          data-testid="header"
        >
          <Button
            variant="icon"
            onClick={() => {
              window.location.href = "/";
              sessionStorage.removeItem("query");
            }}
          >
            <span className="sr-only">Home</span>
            <TheatersIcon sx={{ color: "#86f6ff", fontSize: 40 }} />
          </Button>
          <div className="header__inner">
            <Typography
              className={hasSearch ? "sr-only" : ""}
              variant="h1"
              sx={{ fontSize: 24, fontWeight: "200" }}
            >
              {heading}
            </Typography>
            {hasSearch && <Search />}
          </div>
          <Button
            variant="icon"
            onClick={() => alert("TODO - Log in")}
          >
            <span className="sr-only">Log in</span>
            <Person3OutlinedIcon sx={{ color: "#86f6ff", fontSize: 40 }} />
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
